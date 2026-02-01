// Cloud oplossing met GitHub Pages als backend
class ZyrianCloud {
    constructor() {
        // Gebruik GitHub Gist als gratis database
        this.GIST_ID = 'jouw-gist-id'; // Dit maken we later
        this.GITHUB_TOKEN = 'jouw-token'; // Dit maken we later
    }
    
    // Sla woorden op in GitHub Gist
    async saveWoord(woord) {
        try {
            // Simpele oplossing: gebruik een public API
            const response = await fetch('https://api.jsonbin.io/v3/b', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': 'jouw-jsonbin-key' // Gratis API key
                },
                body: JSON.stringify({ woord: woord, timestamp: Date.now() })
            });
            
            if (response.ok) {
                return true;
            }
        } catch (error) {
            console.log('Fout bij opslaan:', error);
        }
        return false;
    }
    
    // Haal alle woorden op
    async getWoorden() {
        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/60a4b3f6941b4b3b3c3c3c3c/latest', {
                headers: {
                    'X-Master-Key': 'jouw-jsonbin-key'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.record || [];
            }
        } catch (error) {
            console.log('Fout bij laden:', error);
        }
        return [];
    }
}

// Gebruik in de app
const cloud = new ZyrianCloud();
