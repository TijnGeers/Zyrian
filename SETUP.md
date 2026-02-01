# Zyrian Vertaler Online Zetten - Handleiding voor Tijn

Hoi Tijn! 👋

In deze handleiding leer je hoe je de Zyrian Vertaler online kunt zetten, zodat je vrienden hem ook kunnen gebruiken. Je krijgt je eigen website-adres (URL) dat je kunt delen!

---

# Dit gaan we doen

Hier is een overzicht van wat je gaat leren en doen:

1. **Een Windsurf account aanmaken** - zodat je samen met AI kunt werken aan toffe projecten
2. **Leren hoe Windsurf werkt** - zodat je weet hoe je code kunt schrijven en bewerken
3. **Een GitHub account aanmaken** - zodat je je projecten online kunt zetten en delen met vrienden
4. **Alles aan elkaar koppelen** - zodat het vlekkeloos samenwerkt
5. **Je eerste project online zetten!** - de Zyrian Vertaler live op internet

Maak je geen zorgen als dit veel lijkt - we doen alles stap voor stap en ik leg onderweg uit wat alles betekent.

---

# Deel 1: Wat is wat? (Belangrijke begrippen)

Voordat we beginnen, is het handig om te weten wat de verschillende termen betekenen. Lees dit rustig door - je hoeft het niet uit je hoofd te leren, maar het helpt om te begrijpen wat je aan het doen bent.

## Wat is Windsurf?

**Windsurf** is een programma waarin je code kunt schrijven en bewerken. Dit soort programma's noemen we een **code editor** of **IDE** (Integrated Development Environment).

Zie het als Microsoft Word, maar dan speciaal gemaakt voor programmeren:
- Je kunt bestanden openen en bewerken
- De code krijgt kleurtjes zodat je het beter kunt lezen
- Er zit een slimme AI-assistent in die je kan helpen (**Cascade**)

### Wat maakt Windsurf bijzonder?

Het speciale aan Windsurf is de ingebouwde AI-assistent genaamd **Cascade**. Dit is een slimme helper die:
- Je vragen kan beantwoorden over programmeren
- Code voor je kan schrijven of aanpassen
- Fouten kan opsporen en oplossen
- Uitleg kan geven over hoe dingen werken

Je praat met Cascade via een chatvenster, net zoals je met ChatGPT zou praten. Je kunt gewoon in het Nederlands typen!

**Belangrijk**: Windsurf staat op jouw computer. Alles wat je erin maakt, staat alleen op jouw computer totdat je het ergens anders naartoe stuurt (bijvoorbeeld naar GitHub).

## Wat is Git?

**Git** is een programma dat bijhoudt welke wijzigingen je maakt aan je bestanden. Het werkt een beetje zoals "opslaan" in een game:

- Je kunt op elk moment een **save point** maken (dit heet een **commit**)
- Als je iets kapot maakt, kun je terug naar een eerdere versie
- Je kunt zien wat je hebt veranderd

Git draait op je eigen computer en onthoudt de hele geschiedenis van je project.

## Wat is GitHub?

**GitHub** is een website waar je je code online kunt opslaan en delen. Het is als Google Drive, maar dan speciaal voor code.

- **Git** = het programma op je computer dat versies bijhoudt
- **GitHub** = de website waar je je code online zet

Met GitHub kun je:
- Je code veilig online bewaren (backup)
- Je code delen met anderen
- **Een website online zetten** (dit gaan we doen!)

## Wat is een Repository?

Een **repository** (vaak afgekort als **repo**) is een map met je project die door Git wordt bijgehouden. Je kunt het zien als een speciale projectmap die onthoudt wat er allemaal is veranderd.

## Wat is GitHub Pages?

**GitHub Pages** is een gratis dienst van GitHub waarmee je een website online kunt zetten. Je zet je bestanden op GitHub, en GitHub maakt er automatisch een echte website van die iedereen kan bezoeken.

Je krijgt dan een adres zoals: `https://jouw-naam.github.io/zyrian-vertaler/`

## Wat is een Commit?

Een **commit** is een "save point" van je project. Als je een commit maakt, sla je de huidige staat van al je bestanden op. Je geeft elke commit een kort berichtje mee dat beschrijft wat je hebt veranderd, bijvoorbeeld:
- "Nieuw woord toegevoegd aan woordenboek"
- "Kleur van de knop aangepast"

## Wat is Pushen?

**Pushen** betekent: je commits (save points) van je computer naar GitHub sturen. Pas als je pusht, komt je code online te staan.

## Wat is een Branch?

Een **branch** is een "tak" of versie van je project. De hoofdversie heet meestal `main`. Voor nu hoef je hier niet veel mee te doen - we gebruiken gewoon de `main` branch.

---

# Deel 2: Windsurf installeren en leren gebruiken

Laten we beginnen met Windsurf - het programma waarin je gaat werken.

## Stap 1: Maak een Windsurf account aan

1. Open je browser en ga naar **https://windsurf.com**
2. Klik op **Download Windsurf** (of **Get Started**)
3. Download de Windows versie
4. Open het gedownloade bestand en volg de installatie
5. Start Windsurf op
6. Je wordt gevraagd om een account aan te maken:
   - Klik op **Sign Up**
   - Je kunt inloggen met je Google account, of een nieuw account maken met e-mail
   - Volg de stappen op het scherm

✅ **Klaar!** Je hebt nu Windsurf geïnstalleerd en een account.

## Stap 2: Leer Windsurf kennen

Neem even de tijd om Windsurf te verkennen. Hier is een rondleiding:

### Het scherm van Windsurf

Als je Windsurf opent, zie je verschillende onderdelen:

```
┌─────────────────────────────────────────────────────────────┐
│  Menubalk (File, Edit, View, etc.)                          │
├──────────┬──────────────────────────────┬───────────────────┤
│          │                              │                   │
│  Zijbalk │    Hoofdvenster              │   Cascade (AI)    │
│  (links) │    (hier schrijf je code)    │   (rechts)        │
│          │                              │                   │
│          │                              │                   │
├──────────┴──────────────────────────────┴───────────────────┤
│  Onderkant: Terminal / Output                               │
└─────────────────────────────────────────────────────────────┘
```

### De zijbalk (links)

De zijbalk heeft verschillende iconen. De belangrijkste zijn:

1. **📄 Explorer** (bovenste icoon) - Hier zie je alle bestanden in je project
2. **🔍 Zoeken** - Om te zoeken in je bestanden
3. **⑂ Source Control** (vertakkend lijntje) - Voor Git en GitHub (hier komen we later op terug)

### Het hoofdvenster (midden)

Dit is waar je je code schrijft en bewerkt. Als je een bestand opent, verschijnt het hier. Je kunt meerdere bestanden tegelijk open hebben in verschillende tabbladen.

### Cascade (rechts)

Dit is je AI-assistent! Je kunt hier:
- Vragen stellen over programmeren
- Vragen om code te schrijven of aan te passen
- Hulp vragen als iets niet werkt

**Tip**: Je kunt gewoon Nederlands typen. Bijvoorbeeld:
- "Kun je uitleggen wat deze code doet?"
- "Voeg een nieuwe knop toe aan de pagina"
- "Er zit een fout in mijn code, kun je helpen?"

### Een map openen

Om aan een project te werken:
1. Klik op **File** → **Open Folder...**
2. Navigeer naar de map van je project
3. Klik op **Select Folder**

Nu zie je alle bestanden van je project in de zijbalk.

### Bestanden bewerken

1. Klik op een bestand in de zijbalk om het te openen
2. Maak je wijzigingen in het hoofdvenster
3. Druk op `Ctrl + S` om op te slaan

**Let op**: Een bestand met een **witte stip** naast de naam is nog niet opgeslagen!

---

# Deel 3: Veilig werken met Windsurf

Windsurf en Cascade zijn krachtige tools, maar het is belangrijk om veilig te werken. Hier zijn een paar belangrijke regels:

## Werk alleen in je projectmap

Als je Windsurf opent, open dan alleen de map van het project waar je aan werkt (bijvoorbeeld de `zyrian` map). Zo voorkom je dat Cascade per ongeluk andere bestanden op je computer aanpast.

**Goed**: Open de map `zyrian` → Cascade kan alleen bestanden in die map zien en aanpassen

**Niet doen**: Open je hele Documenten map → Cascade zou dan per ongeluk andere bestanden kunnen aanpassen

## Controleer wat Cascade doet

Cascade is slim, maar niet perfect. Voordat je een wijziging accepteert:
- Lees wat Cascade wil veranderen
- Als je iets niet begrijpt, vraag dan uitleg
- Je kunt altijd "nee" zeggen tegen een wijziging

## Zet geen privé-informatie in je code

Straks gaan we je code op GitHub zetten, waar anderen het kunnen zien. Zorg ervoor dat je **nooit** dit soort dingen in je code zet:
- Je echte naam (als je die privé wilt houden)
- Je adres of telefoonnummer
- Wachtwoorden
- Persoonlijke foto's

## Maak regelmatig commits

Een commit is een "save point". Als je regelmatig commits maakt, kun je altijd terug naar een eerdere versie als er iets misgaat.

---

# Deel 4: GitHub instellen

Nu gaan we GitHub instellen, zodat je je projecten online kunt zetten.

## Belangrijk: Jouw code wordt openbaar!

Voordat we verder gaan, moet je iets belangrijks weten:

Als je je code op GitHub zet met een **gratis account**, is je code **openbaar**. Dit betekent:
- Iedereen op internet kan je code bekijken
- Andere programmeurs kunnen zien hoe je dingen hebt gemaakt
- Dit is normaal in de programmeerwereld - veel mensen delen hun code openlijk

**Dit is niet erg voor de Zyrian Vertaler** - het is een leuk project dat je juist wilt delen. Maar onthoud dit voor de toekomst:
- Zet nooit wachtwoorden of geheime sleutels in je code
- Zet geen persoonlijke informatie in je code
- Als je later iets maakt dat je privé wilt houden, kun je een betaald account nemen (dan kun je privé repositories maken)

## Kies je gebruikersnaam zorgvuldig!

Je GitHub gebruikersnaam wordt onderdeel van je website-adres:

```
https://[jouw-gebruikersnaam].github.io/zyrian-vertaler/
```

Denk hier goed over na:

**Nu lijkt `npanekoekje` misschien leuk**, maar:
- Over een paar jaar wil je misschien iets professionelers
- Als je ooit een baan zoekt als programmeur, kijken werkgevers naar je GitHub
- Je gebruikersnaam veranderen is lastig (je moet een nieuw account maken)

**Suggesties voor een goede gebruikersnaam**:
- Je voornaam + achternaam: `tijngeers` (voorbeeld)
- Je voornaam + initiaal: `tijn-g`
- Een korte, neutrale naam die je over 10 jaar nog steeds goed vindt: `gearscode`, `gearslab`, `codegears`, `bytijn`, `t-gears`, `shiftgears`

Je kunt altijd een tweede "fun" account maken voor grappige projecten, maar je hoofdaccount is het beste als iets dat professioneel blijft.

## Stap 3: Maak een GitHub account

1. Open je browser en ga naar **https://github.com**
2. Klik rechtsboven op **Sign up**
3. Vul je gegevens in:
   - **E-mailadres**: gebruik een e-mailadres waar je bij kunt
   - **Wachtwoord**: kies een sterk wachtwoord
   - **Gebruikersnaam**: denk hier goed over na! (zie de tips hierboven)
4. Los de puzzel op om te bewijzen dat je geen robot bent
5. Klik op **Create account**
6. GitHub stuurt een code naar je e-mail - vul die in om je account te bevestigen

✅ **Klaar!** Je hebt nu een GitHub account.

## Stap 4: Installeer Git op je computer

Git is het programma dat je code bijhoudt. Dit moet je installeren.

1. Ga naar **https://git-scm.com/download/win**
2. De download start automatisch (een `.exe` bestand)
3. Open het gedownloade bestand
4. Klik door de installatie heen:
   - Je kunt overal de standaard opties laten staan
   - Klik steeds op **Next**
   - Klik aan het eind op **Install**
5. Wacht tot de installatie klaar is en klik op **Finish**

✅ **Klaar!** Git staat nu op je computer.

## Stap 5: Koppel GitHub aan Windsurf

Nu gaan we Windsurf verbinden met je GitHub account, zodat je code kunt uploaden.

1. Open **Windsurf**
2. Druk op je toetsenbord: `Ctrl + Shift + P`
   - Er opent een zoekbalk bovenin het scherm
3. Typ: `GitHub: Sign in`
4. Klik op de optie **GitHub: Sign in**
5. Er opent een browser venster
6. Log in met je GitHub account (als je dat nog niet was)
7. Klik op **Authorize** om Windsurf toegang te geven
8. Je browser zegt dat je terug kunt naar Windsurf

✅ **Klaar!** Windsurf is nu verbonden met GitHub.

---

# Deel 5: Je project online zetten

Nu gaan we de Zyrian Vertaler daadwerkelijk online zetten!

## Stap 6: Open de zyrian map in Windsurf

1. Open **Windsurf**
2. Klik op **File** → **Open Folder...**
3. Navigeer naar de map waar de Zyrian Vertaler staat (de `zyrian` map, of de `tijn` of `vrienden` submap)
4. Klik op **Select Folder**

Je ziet nu links in het scherm alle bestanden van je project.

## Stap 7: Maak er een Git repository van

1. Kijk naar de **linkerkant** van Windsurf
2. Zoek het icoon dat eruitziet als een **vertakkend lijntje** (Source Control)
   - Het is het derde icoon van boven in de zijbalk
3. Klik erop
4. Je ziet de tekst: "Initialize Repository" of "Repository initialiseren"
5. Klik op die knop

Nu houdt Git alle wijzigingen in deze map bij!

## Stap 8: Maak je eerste commit (save point)

1. Je ziet nu een lijst met al je bestanden onder "Changes"
2. Bovenin zie je een tekstveld waar staat "Message"
3. Typ daar een beschrijving, bijvoorbeeld:
   ```
   Eerste versie Zyrian Vertaler
   ```
4. Klik op het **✓ vinkje** boven het tekstveld (of druk `Ctrl + Enter`)
5. Er verschijnt misschien een vraag: "Stage all changes?" - klik op **Yes**

✅ Je hebt nu je eerste commit gemaakt!

## Stap 9: Zet je code op GitHub

1. Na de commit zie je een knop: **Publish Branch**
2. Klik erop
3. Er verschijnt een keuze:
   - Kies **Publish to GitHub public repository**
   - (Public betekent dat iedereen je code kan zien - dat is nodig voor de gratis website)
4. Geef je repository een naam, bijvoorbeeld: `zyrian-vertaler`
5. Klik op **OK** of **Publish**

Windsurf uploadt nu al je bestanden naar GitHub. Dit kan even duren.

✅ **Klaar!** Je code staat nu online op GitHub!

## Stap 10: Zet GitHub Pages aan

Nu gaan we van je code een echte website maken.

1. Open je browser en ga naar **https://github.com**
2. Log in als dat nodig is
3. Klik rechtsboven op je **profielfoto** → **Your repositories**
4. Klik op de repository die je net hebt gemaakt (bijv. `zyrian-vertaler`)
5. Klik op **Settings** (het tandwiel-icoon, in de menubalk van de repository)
6. Klik in het linkermenu op **Pages**
7. Bij **Source** zie je een dropdown menu
8. Klik erop en kies:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
9. Klik op **Save**

GitHub gaat nu je website bouwen. Dit duurt 1-2 minuten.

## Stap 11: Bekijk je website!

1. Wacht 1-2 minuten
2. Ververs de Pages pagina (druk F5)
3. Bovenaan zie je nu een groen vlak met de tekst:
   > Your site is live at https://[jouw-gebruikersnaam].github.io/[repository-naam]/
4. Klik op die link!

🎉 **Gefeliciteerd!** Je Zyrian Vertaler staat nu online!

Dit adres kun je delen met je vrienden. Iedereen met dit adres kan de vertaler gebruiken!

---

# Deel 6: Wijzigingen doorvoeren (voor later)

Als je later iets wilt aanpassen aan de Zyrian Vertaler, volg dan deze stappen:

## Wijzigingen maken en online zetten

1. **Open Windsurf** en open de zyrian map
2. **Maak je wijzigingen** (bijvoorbeeld een nieuw woord toevoegen aan het woordenboek)
3. **Ga naar Source Control** (het vertakkende lijntje links)
4. Je ziet de bestanden die je hebt aangepast onder "Changes"
5. **Typ een commit bericht**, bijvoorbeeld:
   ```
   Nieuwe woorden toegevoegd
   ```
6. **Klik op het ✓ vinkje** om te committen
7. **Klik op Sync Changes** (of het 🔄 icoon)
   - Dit pusht je wijzigingen naar GitHub

Binnen 1-2 minuten is je website automatisch bijgewerkt!

---

# Deel 7: Hulp en tips

## Iets gaat mis?

- **Foutmelding over Git**: Zorg dat Git geïnstalleerd is (Stap 4)
- **Kan niet inloggen bij GitHub**: Controleer je wachtwoord, of reset het via github.com
- **Website werkt niet**: Wacht een paar minuten, GitHub Pages heeft soms even tijd nodig
- **Bestanden staan niet in de lijst**: Sla je bestanden eerst op (`Ctrl + S`)

## Handige sneltoetsen in Windsurf

| Wat | Toetsen |
|-----|---------|
| Bestand opslaan | `Ctrl + S` |
| Alle bestanden opslaan | `Ctrl + K` dan `S` |
| Zoeken in bestanden | `Ctrl + Shift + F` |
| Command Palette openen | `Ctrl + Shift + P` |

## Meer leren?

Als je meer wilt leren over programmeren en Git:
- **GitHub Skills**: https://skills.github.com (gratis cursussen)
- **Vraag Cascade**: De AI in Windsurf kan je helpen met vragen over code

---

# Samenvatting

Dit heb je geleerd:
1. **Windsurf** is je code editor met AI-assistent Cascade
2. **Git** houdt wijzigingen bij op je computer (save points = commits)
3. **GitHub** slaat je code online op en maakt het zichtbaar voor anderen
4. **GitHub Pages** maakt er een echte website van

Belangrijke dingen om te onthouden:
- **Werk alleen in je projectmap** - zo blijven andere bestanden veilig
- **Je code is openbaar** - zet nooit persoonlijke informatie of wachtwoorden in je code
- **Maak regelmatig commits** - dan kun je altijd terug naar een eerdere versie

Je website-adres is:
```
https://[jouw-gebruikersnaam].github.io/[repository-naam]/
```

Veel plezier met het delen van de Zyrian Vertaler! 🚀

---

*Heb je vragen? Vraag het aan Cascade in Windsurf - die helpt je graag verder!*
