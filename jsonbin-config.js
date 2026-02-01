// JSONBin.io configuratie - veilige oplossing
const JSONBIN_CONFIG = {
    // Deze waarden moet je invullen na het aanmaken van je JSONBin account
    BIN_ID: '', // Vul hier je Bin ID in
    API_KEY: '', // Vul hier je X-Master-Key in
    API_URL: 'https://api.jsonbin.io/v3/b'
};

// Cache voor snelheid
const CACHE_KEY = 'zyrian-woorden-cache';
const CACHE_TIMESTAMP_KEY = 'zyrian-woorden-cache-timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuten cache

class ZyrianJSONBin {
    constructor() {
        this.binId = JSONBIN_CONFIG.BIN_ID;
        this.apiKey = JSONBIN_CONFIG.API_KEY;
        this.apiUrl = JSONBIN_CONFIG.API_URL;
    }
    
    // Controleer of configuratie is ingesteld
    isConfigured() {
        return !!(this.binId && this.apiKey);
    }
    
    // Haal woorden op van JSONBin
    async getWoorden() {
        try {
            // Eerst checken of we recente cache hebben
            const cached = this.getCachedWoorden();
            if (cached) {
                console.log('📦 Woorden uit cache geladen');
                return cached;
            }
            
            // Haal van JSONBin
            const response = await fetch(`${this.apiUrl}/${this.binId}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            const woorden = data.record?.woorden || [];
            
            // Cache de resultaten
            this.setCachedWoorden(woorden);
            
            console.log('🌐 Woorden van JSONBin geladen:', woorden.length);
            return woorden;
            
        } catch (error) {
            console.error('❌ Fout bij laden van JSONBin:', error);
            // Fallback naar cache als JSONBin faalt
            return this.getCachedWoorden() || [];
        }
    }
    
    // Sla woorden op naar JSONBin
    async saveWoorden(woorden) {
        try {
            const response = await fetch(`${this.apiUrl}/${this.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify({
                    woorden: woorden
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            // Update cache
            this.setCachedWoorden(woorden);
            
            console.log('✅ Woorden opgeslagen naar JSONBin');
            return true;
            
        } catch (error) {
            console.error('❌ Fout bij opslaan naar JSONBin:', error);
            return false;
        }
    }
    
    // Voeg een woord toe
    async addWoord(woord) {
        const schoonWoord = woord.toLowerCase().trim();
        if (!schoonWoord || schoonWoord.length < 2) return false;
        
        const woorden = await this.getWoorden();
        
        if (!woorden.includes(schoonWoord)) {
            woorden.push(schoonWoord);
            woorden.sort();
            
            const success = await this.saveWoorden(woorden);
            if (success) {
                console.log('➕ Woord toegevoegd:', schoonWoord);
                return true;
            }
        }
        
        return false;
    }
    
    // Cache functies
    getCachedWoorden() {
        try {
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            const cached = localStorage.getItem(CACHE_KEY);
            
            if (timestamp && cached) {
                const age = Date.now() - parseInt(timestamp);
                if (age < CACHE_DURATION) {
                    return JSON.parse(cached);
                }
            }
        } catch (error) {
            console.error('Cache fout:', error);
        }
        return null;
    }
    
    setCachedWoorden(woorden) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(woorden));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        } catch (error) {
            console.error('Cache save fout:', error);
        }
    }
    
    // Wis cache
    clearCache() {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    }
    
    // Toon configuratie status
    getStatus() {
        if (this.isConfigured()) {
            return '✅ JSONBin is geconfigureerd';
        } else {
            return '❌ JSONBin niet geconfigureerd - vul BIN_ID en API_KEY in';
        }
    }
}
