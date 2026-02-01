// Supabase oplossing - gratis cloud database
class ZyrianSupabase {
    constructor() {
        // Gratis Supabase URL en key
        this.supabaseUrl = 'https://jouw-project.supabase.co';
        this.supabaseKey = 'jouw-anon-key';
    }
    
    // Sla woord op
    async saveWoord(woord) {
        try {
            const response = await fetch(`${this.supabaseUrl}/rest/v1/woorden`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                },
                body: JSON.stringify({
                    woord: woord.toLowerCase(),
                    created_at: new Date().toISOString()
                })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Fout:', error);
            return false;
        }
    }
    
    // Haal woorden op
    async getWoorden() {
        try {
            const response = await fetch(`${this.supabaseUrl}/rest/v1/woorden?select=woord`, {
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.map(item => item.woord);
            }
        } catch (error) {
            console.error('Fout:', error);
        }
        return [];
    }
}
