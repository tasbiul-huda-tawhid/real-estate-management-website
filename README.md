# Real Estate Management Website — 2024 MAHSA Final-Year Project

Property Desk is a small, **AI-assisted 2026 portfolio rebuild** inspired by my 2024 Real Estate Management Website, the final-year project for my Bachelor of Information Technology (Honours) at MAHSA University. This is newly built demo code, not the original academic submission or a recreation of its exact features. It is not a university or commercial product.

Company name used in the 2024 academic project: Moonlit Holdings Limited. Unofficial academic demo; all listings are fictional.

## Try the demo

From this folder, start a local server with `python3 -m http.server 8000` (Windows: `py -m http.server 8000`). Open `http://localhost:8000` and stop the server with Ctrl+C. No packages, accounts, setup secrets or external APIs are needed.

1. Search for **Fern Quarter**. Two fictional apartments should match.
2. Open **Courtyard Apartment**, change its status to **Under offer** and save.
3. Reload and reopen that listing to see the saved edit. Use **Reset demo data** to clear edits and restore the filters.

The demo provides text search, combined type and status filters, listing details and browser-local status updates. It uses HTML, CSS and JavaScript only. The properties, districts, values and illustration are fictional. There is no shared database, authentication, real location data or server-side persistence. Edits stay in this browser, and storage restrictions may prevent them from surviving a reload.
