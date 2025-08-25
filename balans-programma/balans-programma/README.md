# Balans Programma (React + Vite + Tailwind)

Website voor het 4-weeks programma (18:6 vasten, voeding, beweging, dagboek) – © Jeffrey van Soeren.

## Snel starten
```bash
npm i
npm run dev
```

## Betaallink instellen (Stripe)
1. Maak in Stripe een *Product* (Balans Programma) met eenmalige prijs **€29,95**.
2. Maak een **Payment Link** en kopieer de URL (begint met `https://buy.stripe.com/`).
3. Vervang in `src/App.jsx` de constante:
   ```js
   const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_voorbeeldlink12345";
   ```
   door jouw echte link.

## Deploy (Vercel)
- Push deze map naar GitHub.
- Vercel → New Project → kies je repo → Deploy.
- (Optioneel) koppel je domein bij Project → Settings → Domains.

## Licentie & Copyright
© 2025 Jeffrey van Soeren. Alle rechten voorbehouden.
