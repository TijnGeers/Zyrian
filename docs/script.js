(function () {
  const inputEl = document.getElementById("input");
  const outputEl = document.getElementById("output");
  const btnNl = document.getElementById("btn-nl");
  const btnZy = document.getElementById("btn-zy");
  const onbekendEl = document.getElementById("onbekend");
  
  // UI elementen voor "nog te vertalen" - kunnen null zijn in vrienden-versie
  const nogLijstEl = document.getElementById("nog-lijst");
  const nogCountEl = document.getElementById("nog-count");
  const btnDownload = document.getElementById("btn-download");
  const btnClear = document.getElementById("btn-clear");
  const heeftNogTeVertalenUI = !!(nogLijstEl && nogCountEl);
  
  // Zet het huidige jaar in de footer
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Cloud oplossing - werkt overal ter wereld! 🌍
  let cloud = null;
  let nogTeVertalen = [];
  
  // Initialiseer cloud
  cloud = new ZyrianCloud();
  
  // Wacht even tot Firebase geladen is, dan luister naar updates
  setTimeout(() => {
    cloud.onWoordenChanged((woorden) => {
      nogTeVertalen = woorden;
      updateNogTeVertalenUI();
    });
  }, 1000);
  
  // Rate limiting: max 50 woorden per dag
  const MAX_WOORDEN_PER_DAG = 50;
  const MIN_WOORD_LENGTE = 2;
  const MAX_WOORD_LENGTE = 50;
  
  function incrementDailyCount() {
    const data = getDailyCount();
    data.count++;
    localStorage.setItem(DAILY_COUNT_KEY, JSON.stringify(data));
    return data.count;
  }
  
  function getDailyCount() {
    const data = JSON.parse(localStorage.getItem(DAILY_COUNT_KEY) || '{"date":"","count":0}');
    const vandaag = new Date().toDateString();
    if (data.date !== vandaag) {
      return { date: vandaag, count: 0 };
    }
    return data;
  }

  const woordenboek = window.ZYRIAN_WOORDENBOEK;

  if (!woordenboek || typeof woordenboek !== "object") {
    outputEl.value =
      "Fout: woordenboek.js is niet geladen. Controleer of woordenboek.js in dezelfde map staat als index.html en of de bestandsnaam exact klopt.";
    return;
  }

  const omgekeerd = maakOmgekeerd(woordenboek);
  
  // Toon opgeslagen woorden bij laden (alleen als UI bestaat)
  if (heeftNogTeVertalenUI) {
    // Luister naar custom events voor updates
    window.addEventListener('zyrian-woord-toegevoegd', () => {
      updateNogTeVertalenUI();
    });
    
    // Ververs de lijst wanneer de pagina focus krijgt
    window.addEventListener('focus', async () => {
      if (cloud) {
        const woorden = await cloud.getWoorden();
        nogTeVertalen = woorden;
        updateNogTeVertalenUI();
      }
    });
  }

  btnNl.addEventListener("click", () => {
    const result = vertaalZin(inputEl.value, woordenboek);
    outputEl.value = result.tekst;
    toonOnbekend(result.onbekend);
  });

  btnZy.addEventListener("click", () => {
    const result = vertaalZin(inputEl.value, omgekeerd);
    outputEl.value = result.tekst;
    toonOnbekend(result.onbekend);
  });

  // Enter-toets: automatisch herkennen of input Nederlands of Zyrian is
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const zin = inputEl.value.trim();
      if (!zin) return;
      
      // Tel hoeveel woorden in Nederlands vs Zyrian voorkomen
      const woorden = zin.toLowerCase().split(/\s+/);
      let nlCount = 0;
      let zyCount = 0;
      
      for (const woord of woorden) {
        // Strip leestekens
        const schoon = woord.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ']/g, "");
        if (woordenboek[schoon]) nlCount++;
        if (omgekeerd[schoon]) zyCount++;
      }
      
      // Als meer woorden in Zyrian voorkomen, vertaal naar Nederlands
      // Anders vertaal naar Zyrian
      let result;
      if (zyCount > nlCount) {
        result = vertaalZin(zin, omgekeerd);
      } else {
        result = vertaalZin(zin, woordenboek);
      }
      outputEl.value = result.tekst;
      toonOnbekend(result.onbekend);
    }
  });

  function maakOmgekeerd(boek) {
    const out = {};
    for (const nl in boek) out[boek[nl]] = nl;
    return out;
  }

  function vertaalZin(zin, boek) {
    if (!zin) return { tekst: "", onbekend: [] };
    const onbekend = [];
    const tekst = zin
      .trim()
      .split(/\s+/)
      .map((token) => vertaalToken(token, boek, onbekend))
      .join(" ");
    return { tekst, onbekend };
  }

  function vertaalToken(token, boek, onbekend) {
    // prefix = leestekens voor, kern = woord, suffix = leestekens na
    // ondersteunt ook letters met accenten in het eenvoudige bereik
    const re = /^([^A-Za-zÀ-ÖØ-öø-ÿ0-9]*)([A-Za-zÀ-ÖØ-öø-ÿ0-9']+)([^A-Za-zÀ-ÖØ-öø-ÿ0-9]*)$/;
    const m = token.match(re);
    if (!m) return token;

    const prefix = m[1] || "";
    const kern = m[2] || "";
    const suffix = m[3] || "";

    const lower = kern.toLowerCase();
    const vervanging = boek[lower];
    
    if (!vervanging && onbekend && !onbekend.includes(kern)) {
      onbekend.push(kern);
    }

    const resultaat = vervanging || lower;
    const metCase = isCapitalized(kern) ? capitalize(resultaat) : resultaat;
    return prefix + metCase + suffix;
  }
  
  function toonOnbekend(woorden) {
    if (!woorden || woorden.length === 0) {
      onbekendEl.classList.remove("visible");
      onbekendEl.textContent = "";
      return;
    }
    
    const tekst = woorden.length === 1
      ? `Dit woord staat nog niet in het woordenboek: ${woorden[0]}`
      : `Deze woorden staan nog niet in het woordenboek: ${woorden.join(", ")}`;
    
    onbekendEl.textContent = tekst;
    onbekendEl.classList.add("visible");
    
    // Voeg onbekende woorden toe aan de "nog te vertalen" lijst
    voegToeAanNogTeVertalen(woorden);
  }
  
  function voegToeAanNogTeVertalen(woorden) {
    if (!cloud) {
      console.log('Cloud niet beschikbaar');
      return;
    }
    
    let gewijzigd = false;
    const dailyData = getDailyCount();
    
    for (const woord of woorden) {
      const lower = woord.toLowerCase();
      
      // Filter: alleen letters, min 2, max 50 karakters
      if (lower.length < MIN_WOORD_LENGTE || lower.length > MAX_WOORD_LENGTE) continue;
      if (!/^[a-zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]+$/.test(lower)) continue;
      
      // Rate limiting: max 50 nieuwe woorden per dag
      if (dailyData.count >= MAX_WOORDEN_PER_DAG) break;
      
      // Sla woord op in cloud
      cloud.addWoord(lower).then(success => {
        if (success) {
          incrementDailyCount();
          dailyData.count++;
          gewijzigd = true;
          
          // Update lokale lijst
          cloud.getWoorden().then(woorden => {
            nogTeVertalen = woorden;
            updateNogTeVertalenUI();
          });
          
          alert(`✅ Woord opgeslagen!`);
        }
      });
    }
  }
  
  function updateNogTeVertalenUI() {
    // Update de UI alleen als de elementen bestaan (beheerders-app)
    if (heeftNogTeVertalenUI) {
      nogCountEl.textContent = nogTeVertalen.length;
      nogLijstEl.textContent = nogTeVertalen.join(", ");
      
      // Test: laat zien wat er in de UI staat
      console.log("UI bijgewerkt - aantal:", nogTeVertalen.length);
      console.log("UI bijgewerkt - woorden:", nogTeVertalen);
    }
    
    // Stuur een event zodat andere tabs weten dat er iets is veranderd
    window.dispatchEvent(new CustomEvent('zyrian-woord-toegevoegd', {
      detail: { woorden: nogTeVertalen }
    }));
  }
  
  // Download knop (alleen als element bestaat)
  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      // Haal altijd de actuele data uit localStorage
      const actueleLijst = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (actueleLijst.length === 0) {
        alert("Er zijn nog geen woorden om te downloaden.");
        return;
      }
      const inhoud = "Nog te vertalen woorden:\n\n" + actueleLijst.join("\n");
      const blob = new Blob([inhoud], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nog-te-vertalen.txt";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  
  // Wis knop (alleen als element bestaat)
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      // Haal altijd de actuele data uit localStorage
      const actueleLijst = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (actueleLijst.length === 0) return;
      if (confirm("Weet je zeker dat je de lijst wilt wissen?")) {
        nogTeVertalen = [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nogTeVertalen));
        updateNogTeVertalenUI();
      }
    });
  }

  function isCapitalized(word) {
    return word.length > 0 && word[0] === word[0].toUpperCase();
  }

  function capitalize(word) {
    return word ? word[0].toUpperCase() + word.slice(1) : word;
  }
})();