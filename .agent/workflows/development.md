---
description: How to start the development environment for Axiom Scrumban
---
# Development Workflow

To run the Axiom Scrumban application locally, you need to have both the Laravel backend and the Vite frontend dev server running simultaneously.

### 1. Start Dev Servers
Run the following command in your terminal at the project root:
```powershell
npm run dev
```
This command uses `concurrently` to start:
- `php artisan serve` (Backend API)
- `vite` (Frontend Assets & HMR)
- `php artisan reverb:start` (WebSocket Server)

### 2. Access the App
Once the servers are running, open your browser to:
[http://127.0.0.1:8000](http://127.0.0.1:8000)

### Troubleshooting
- **White Screen**: Ensure `npm run dev` is running and has no errors. If you see a manifest error, Vite might not have started correctly.
- **WebSocket Errors**: Ensure port `6001` is not blocked by another application.
- **Configuration Changes**: If you modify `.env`, run `php artisan config:clear` to apply changes.
