// Alternatieve cloud oplossingen als JSONBin niet werkt

// Optie 1: MyJSON (geen account nodig)
class MyJSONSolution {
    constructor() {
        this.apiUrl = 'https://api.myjson.com/bins';
    }
    
    async getWoorden() {
        try {
            // Maak een nieuwe bin of gebruik bestaande
            const response = await fetch('https://api.myjson.com/bins/1g5d3z');
            if (response.ok) {
                const data = await response.json();
                return data.woorden || [];
            }
        } catch (error) {
            console.error('MyJSON fout:', error);
        }
        return [];
    }
    
    async saveWoorden(woorden) {
        try {
            const response = await fetch('https://api.myjson.com/bins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ woorden: woorden })
            });
            
            if (response.ok) {
                console.log('Opgeslagen naar MyJSON');
                return true;
            }
        } catch (error) {
            console.error('MyJSON save fout:', error);
        }
        return false;
    }
}

// Optie 2: GitHub Gist (gratis GitHub account)
class GitHubGistSolution {
    constructor() {
        this.gistId = ''; // Vul hier je Gist ID in
        this.token = ''; // Vul hier je GitHub token in
    }
    
    async getWoorden() {
        try {
            const response = await fetch(`https://api.github.com/gists/${this.gistId}`);
            if (response.ok) {
                const data = await response.json();
                const content = data.files['woorden.json']?.content;
                return content ? JSON.parse(content).woorden : [];
            }
        } catch (error) {
            console.error('GitHub Gist fout:', error);
        }
        return [];
    }
    
    async saveWoorden(woorden) {
        try {
            const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files: {
                        'woorden.json': {
                            content: JSON.stringify({ woorden: woorden }, null, 2)
                        }
                    }
                })
            });
            
            if (response.ok) {
                console.log('Opgeslagen naar GitHub Gist');
                return true;
            }
        } catch (error) {
            console.error('GitHub Gist save fout:', error);
        }
        return false;
    }
}

// Optie 3: PasteBin (geen account nodig voor publieke pastes)
class PasteBinSolution {
    constructor() {
        this.devKey = 'YOUR_DEV_KEY'; // Optioneel
    }
    
    async getWoorden() {
        // PasteBin is read-only zonder account
        return [];
    }
    
    async saveWoorden(woorden) {
        try {
            const content = JSON.stringify({ woorden: woorden }, null, 2);
            const formData = new FormData();
            formData.append('api_dev_key', this.devKey);
            formData.append('api_option', 'paste');
            formData.append('api_paste_code', content);
            formData.append('api_paste_private', '0');
            formData.append('api_paste_expire_date', 'N');
            
            const response = await fetch('https://pastebin.com/api/api_post.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                console.log('Opgeslagen naar PasteBin');
                return true;
            }
        } catch (error) {
            console.error('PasteBin fout:', error);
        }
        return false;
    }
}

// Optie 4: Supabase (gratis, maar vereist setup)
class SupabaseSolution {
    constructor() {
        this.url = 'https://jouw-project.supabase.co';
        this.key = 'jouw-anon-key';
    }
    
    async getWoorden() {
        try {
            const response = await fetch(`${this.url}/rest/v1/woorden?select=woord`, {
                headers: {
                    'apikey': this.key,
                    'Authorization': `Bearer ${this.key}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.map(item => item.woord);
            }
        } catch (error) {
            console.error('Supabase fout:', error);
        }
        return [];
    }
    
    async saveWoorden(woorden) {
        try {
            const response = await fetch(`${this.url}/rest/v1/woorden`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.key,
                    'Authorization': `Bearer ${this.key}`
                },
                body: JSON.stringify({
                    woord: woorden[woorden.length - 1], // Alleen het laatste woord
                    created_at: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                console.log('Opgeslagen naar Supabase');
                return true;
            }
        } catch (error) {
            console.error('Supabase save fout:', error);
        }
        return false;
    }
}
