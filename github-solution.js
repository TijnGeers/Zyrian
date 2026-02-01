// GitHub Pages oplossing - geen Firebase nodig!
class ZyrianGitHub {
    constructor() {
        // Gebruik GitHub Gist als gratis database
        this.GIST_ID = 'zyrian-woordenlijst';
        this.GITHUB_API = 'https://api.github.com';
        this.LOCAL_STORAGE_KEY = 'zyrian-woorden-cache';
    }
    
    // Sla woord op in localStorage (werkt direct)
    async saveWoord(woord) {
        try {
            // Haal huidige woorden
            let woorden = this.getWoordenFromStorage();
            
            // Voeg nieuw woord toe
            const schoonWoord = woord.toLowerCase().trim();
            if (schoonWoord && !woorden.includes(schoonWoord)) {
                woorden.push(schoonWoord);
                woorden.sort();
                
                // Sla op in localStorage
                localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(woorden));
                
                // Probeer te synchroniseren met GitHub (optioneel)
                this.syncToGitHub(woorden);
                
                console.log('Woord opgeslagen:', schoonWoord);
                return true;
            }
        } catch (error) {
            console.error('Fout bij opslaan:', error);
        }
        return false;
    }
    
    // Haal woorden uit localStorage
    getWoordenFromStorage() {
        try {
            return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
        } catch (error) {
            return [];
        }
    }
    
    // Luister naar veranderingen
    onWoordenChanged(callback) {
        // Check elke 5 seconden voor veranderingen
        setInterval(() => {
            const woorden = this.getWoordenFromStorage();
            callback(woorden);
        }, 5000);
        
        // Direct check
        const woorden = this.getWoordenFromStorage();
        callback(woorden);
    }
    
    // Synchroniseer met GitHub (optioneel)
    async syncToGitHub(woorden) {
        try {
            // Dit is optioneel - voor nu gebruiken we alleen localStorage
            // Later kunnen we GitHub Gist toevoegen als dat nodig is
            console.log('Woorden opgeslagen in localStorage:', woorden);
        } catch (error) {
            console.log('GitHub sync niet beschikbaar, localStorage werkt wel');
        }
    }
    
    // Exporteer woorden
    exportWoorden() {
        const woorden = this.getWoordenFromStorage();
        const data = JSON.stringify(woorden, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'zyrian-woorden.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Importeer woorden
    importWoorden(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const woorden = JSON.parse(e.target.result);
                    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(woorden));
                    resolve(woorden);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
}
