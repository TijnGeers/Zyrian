// Super simpele cloud oplossing - GEEN account nodig!
class SimpleCloud {
    constructor() {
        this.STORAGE_KEY = 'zyrian-cloud-woorden';
        this.SYNC_KEY = 'zyrian-last-sync';
    }
    
    // Simpele synchronisatie via localStorage events
    async getWoorden() {
        try {
            // Proeer eerst van localStorage
            const local = localStorage.getItem(this.STORAGE_KEY);
            if (local) {
                return JSON.parse(local);
            }
            
            // Fallback naar lege lijst
            return [];
        } catch (error) {
            console.error('Fout bij laden:', error);
            return [];
        }
    }
    
    async saveWoorden(woorden) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(woorden));
            localStorage.setItem(this.SYNC_KEY, Date.now().toString());
            
            // Trigger event voor andere tabs
            window.dispatchEvent(new CustomEvent('zyrian-sync', {
                detail: { woorden: woorden, timestamp: Date.now() }
            }));
            
            console.log('Woorden lokaal opgeslagen:', woorden.length);
            return true;
        } catch (error) {
            console.error('Fout bij opslaan:', error);
            return false;
        }
    }
    
    async addWoord(woord) {
        const woorden = await this.getWoorden();
        const schoonWoord = woord.toLowerCase().trim();
        
        if (schoonWoord && !woorden.includes(schoonWoord)) {
            woorden.push(schoonWoord);
            woorden.sort();
            
            const success = await this.saveWoorden(woorden);
            if (success) {
                console.log('Woord toegevoegd:', schoonWoord);
                return true;
            }
        }
        
        return false;
    }
    
    // Luister naar synchronisatie
    onSync(callback) {
        // Luister naar custom events
        window.addEventListener('zyrian-sync', (e) => {
            callback(e.detail.woorden);
        });
        
        // Luister naar storage events (andere tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === this.STORAGE_KEY || e.key === this.SYNC_KEY) {
                this.getWoorden().then(woorden => {
                    callback(woorden);
                });
            }
        });
        
        // Directe update
        this.getWoorden().then(woorden => {
            callback(woorden);
        });
    }
    
    // Exporteer voor delen
    export() {
        const woorden = localStorage.getItem(this.STORAGE_KEY) || '[]';
        const data = JSON.stringify(JSON.parse(woorden), null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'zyrian-woorden.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Importeer voor delen
    import(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const woorden = JSON.parse(e.target.result);
                    this.saveWoorden(woorden);
                    resolve(woorden);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
}
