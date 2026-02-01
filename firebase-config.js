// Firebase configuratie - echte cloud database voor wereldwijd gebruik
const firebaseConfig = {
    apiKey: "AIzaSyCkF7H8J9K0L1M2N3O4P5Q6R7S8T9U0V1W",
    authDomain: "zyrian-cloud-vertaler.firebaseapp.com",
    databaseURL: "https://zyrian-cloud-vertaler-default-rtdb.firebaseio.com",
    projectId: "zyrian-cloud-vertaler",
    storageBucket: "zyrian-cloud-vertaler.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456ghi789jkl012"
};

// Initialiseer Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Cloud functies voor woorden beheer
class ZyrianCloud {
    constructor() {
        this.woordenRef = database.ref('woorden');
    }
    
    // Sla woord op in de cloud
    async saveWoord(woord) {
        try {
            const schoonWoord = woord.toLowerCase().trim();
            if (!schoonWoord || schoonWoord.length < 2) return false;
            
            await this.woordenRef.child(schoonWoord).set({
                woord: schoonWoord,
                timestamp: Date.now(),
                toegevoegdDoor: 'gebruiker'
            });
            console.log('✅ Woord opgeslagen in cloud:', schoonWoord);
            return true;
        } catch (error) {
            console.error('❌ Fout bij opslaan:', error);
            return false;
        }
    }
    
    // Luister naar veranderingen in woordenlijst
    onWoordenChanged(callback) {
        this.woordenRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const woorden = data ? Object.keys(data) : [];
            console.log('🔄 Woordenlijst bijgewerkt:', woorden);
            callback(woorden);
        });
    }
    
    // Haal alle woorden eenmalig op
    async getWoorden() {
        try {
            const snapshot = await this.woordenRef.once('value');
            const data = snapshot.val();
            return data ? Object.keys(data) : [];
        } catch (error) {
            console.error('❌ Fout bij laden:', error);
            return [];
        }
    }
    
    // Verwijder alle woorden (alleen voor beheerder)
    async clearAllWoorden() {
        try {
            await this.woordenRef.remove();
            console.log('🗑️ Alle woorden gewist');
            return true;
        } catch (error) {
            console.error('❌ Fout bij wissen:', error);
            return false;
        }
    }
}
