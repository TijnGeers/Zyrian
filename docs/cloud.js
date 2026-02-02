// Echte Cloud Oplossing - Werkt overal ter wereld!
// Gebruikt Firebase Realtime Database

class ZyrianCloud {
    constructor() {
        // Firebase configuratie - JOUW DATABASE!
        this.firebaseConfig = {
            databaseURL: "https://zyrian-vertaler-default-rtdb.europe-west1.firebasedatabase.app"
        };
        
        this.LOCAL_KEY = 'zyrian-local-woorden';
        this.dbRef = null;
        this.initialized = false;
        
        // Wacht tot pagina geladen is, dan initialiseer Firebase
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initFirebase());
        } else {
            // DOM is al geladen, wacht kort op Firebase SDK
            setTimeout(() => this.initFirebase(), 100);
        }
    }
    
    initFirebase() {
        try {
            if (typeof firebase !== 'undefined' && firebase.database) {
                if (!firebase.apps.length) {
                    firebase.initializeApp(this.firebaseConfig);
                }
                this.dbRef = firebase.database().ref('woorden');
                this.initialized = true;
                console.log('✅ Firebase verbonden met:', this.firebaseConfig.databaseURL);
            } else {
                console.warn('⚠️ Firebase SDK niet beschikbaar - gebruik lokale opslag');
                console.warn('Tip: Open de app via een webserver, niet via file://');
            }
        } catch (error) {
            console.error('Firebase init fout:', error);
        }
    }
    
    // Haal woorden op
    async getWoorden() {
        // Wacht even als Firebase nog niet klaar is
        if (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        if (this.initialized && this.dbRef) {
            try {
                const snapshot = await this.dbRef.once('value');
                const data = snapshot.val();
                if (data) {
                    const woorden = Object.keys(data);
                    this.setLocalWoorden(woorden);
                    return woorden;
                }
                return [];
            } catch (error) {
                console.error('Firebase get fout:', error);
            }
        }
        return this.getLocalWoorden();
    }
    
    // Voeg een woord toe
    async addWoord(woord) {
        const schoonWoord = woord.toLowerCase().trim();
        if (!schoonWoord || schoonWoord.length < 2) return false;
        
        // Wacht even als Firebase nog niet klaar is
        if (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        if (this.initialized && this.dbRef) {
            try {
                await this.dbRef.child(schoonWoord).set({
                    woord: schoonWoord,
                    timestamp: Date.now()
                });
                console.log('☁️ Woord opgeslagen in cloud:', schoonWoord);
                return true;
            } catch (error) {
                console.error('Firebase save fout:', error);
            }
        }
        
        // Fallback naar lokaal
        const woorden = this.getLocalWoorden();
        if (!woorden.includes(schoonWoord)) {
            woorden.push(schoonWoord);
            woorden.sort();
            this.setLocalWoorden(woorden);
            console.log('💾 Woord lokaal opgeslagen:', schoonWoord);
            return true;
        }
        return false;
    }
    
    // Luister naar veranderingen (real-time sync)
    onWoordenChanged(callback) {
        // Wacht even tot Firebase klaar is
        const startListening = () => {
            if (this.initialized && this.dbRef) {
                console.log('🔄 Luisteren naar Firebase updates...');
                this.dbRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    const woorden = data ? Object.keys(data) : [];
                    this.setLocalWoorden(woorden);
                    callback(woorden);
                });
            } else {
                console.log('📂 Gebruik lokale opslag');
                // Fallback: gebruik lokale opslag
                callback(this.getLocalWoorden());
                
                // Check periodiek voor updates
                setInterval(() => {
                    callback(this.getLocalWoorden());
                }, 5000);
            }
        };
        
        // Wacht 1 seconde om Firebase te laten initialiseren
        setTimeout(startListening, 1000);
    }
    
    // Wis alle woorden
    async clearAll() {
        if (this.initialized && this.dbRef) {
            try {
                await this.dbRef.remove();
                console.log('🗑️ Alle woorden gewist uit cloud');
                return true;
            } catch (error) {
                console.error('Firebase clear fout:', error);
            }
        }
        localStorage.removeItem(this.LOCAL_KEY);
        return true;
    }
    
    // Lokale opslag
    getLocalWoorden() {
        try {
            return JSON.parse(localStorage.getItem(this.LOCAL_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }
    
    setLocalWoorden(woorden) {
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(woorden));
    }
}
