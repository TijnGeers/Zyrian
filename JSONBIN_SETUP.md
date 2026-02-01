# JSONBin.io Setup - 5 minuten

## Stap 1: Maak JSONBin account
1. Ga naar: https://jsonbin.io
2. Klik op "Sign Up" en maak een gratis account
3. Log in

## Stap 2: Maak een nieuwe Bin
1. Klik op "Create new bin"
2. Geef het een naam: `zyrian-woordenlijst`
3. Bij "Content" vul je in:
```json
{
  "woorden": []
}
```
4. Klik op "Create"

## Stap 3: Krijg je Bin ID en API Key
1. Na het aanmaken zie je je Bin ID (bijv. `65a1b2c3d4e5f6789012345`)
2. Ga naar je profiel (klik op je naam rechtsboven)
3. Klik op "API Keys"
4. Kopieer je "X-Master-Key" (begint met `$2b$10$...`)

## Stap 4: Configureer de app
1. Open `jsonbin-config.js`
2. Vul je gegevens in:
```javascript
const JSONBIN_CONFIG = {
    BIN_ID: 'jouw-bin-id-hier',     // Bijv: 65a1b2c3d4e5f6789012345
    API_KEY: 'jouw-api-key-hier',  // Bijv: $2b$10$...
    API_URL: 'https://api.jsonbin.io/v3/b'
};
```
3. Sla het bestand op

## Stap 5: Test het!
1. Open `vrienden/index.html`
2. Open `tijn/index.html` (wachtwoord: zyrian2026)
3. Typ een onbekend woord in de vrienden-app
4. Het woord verschijnt direct in de beheerders-app!

## Veiligheid
- ✅ API key is alleen in de broncode zichtbaar
- ✅ Iedereen kan lezen (public read)
- ✅ Alleen met API key kan schrijven
- ✅ Gratis en onbeperkt voor klein gebruik

## Problemen?
- Foutmelding? Check of BIN_ID en API_KEY correct zijn ingevuld
- Werkt niet? Open browser console (F12) en kijk naar foutmeldingen
