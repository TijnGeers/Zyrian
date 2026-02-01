// Super simpele oplossing - werkt direct!
class SimpleZyrian {
    constructor() {
        this.STORAGE_KEY = 'zyrian-woorden';
        this.LAST_UPDATE_KEY = 'zyrian-last-update';
    }
    
    // Sla woord op
    saveWoord(woord) {
        let woorden = this.getWoorden();
        const schoonWoord = woord.toLowerCase().trim();
        
        if (schoonWoord && !woorden.includes(schoonWoord)) {
            woorden.push(schoonWoord);
            woorden.sort();
            
            // Sla op met timestamp
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(woorden));
            localStorage.setItem(this.LAST_UPDATE_KEY, Date.now().toString());
            
            // Trigger update event
            window.dispatchEvent(new CustomEvent('zyrian-update', {
                detail: { woorden: woorden }
            }));
            
            console.log('Woord opgeslagen:', schoonWoord);
            return true;
        }
        return false;
    }
    
    // Haal woorden op
    getWoorden() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        } catch (error) {
            return [];
        }
    }
    
    // Luister naar updates
    onUpdate(callback) {
        // Luister naar eigen updates
        window.addEventListener('zyrian-update', (e) => {
            callback(e.detail.woorden);
        });
        
        // Luister naar updates van andere tabs
        window.addEventListener('storage', (e) => {
            if (e.key === this.STORAGE_KEY || e.key === this.LAST_UPDATE_KEY) {
                callback(this.getWoorden());
            }
        });
        
        // Directe update
        callback(this.getWoorden());
    }
    
    // Wis alle woorden
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.LAST_UPDATE_KEY);
        window.dispatchEvent(new CustomEvent('zyrian-update', {
            detail: { woorden: [] }
        }));
    }
    
    // Exporteer woorden
    export() {
        const woorden = this.getWoorden();
        const text = woorden.join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'zyrian-woorden.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Importeer woorden
    import(text) {
        const woorden = text.split('\n')
            .map(w => w.toLowerCase().trim())
            .filter(w => w.length > 0);
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(woorden));
        localStorage.setItem(this.LAST_UPDATE_KEY, Date.now().toString());
        
        window.dispatchEvent(new CustomEvent('zyrian-update', {
            detail: { woorden: woorden }
        }));
        
        return woorden;
    }
}
