export const PAGE_SIZE_OPTIONS = [5, 10, 25];

const URL_MAP: Record<string, string> = {
    Development : "http://localhost:5173",
    Staging     : "",
    Production  : "",
};

// VITE_APP_ENV is set in .env files for staging/production.
// In dev, import.meta.env.DEV is automatically true by Vite.
const env = import.meta.env.VITE_APP_ENV ?? (import.meta.env.DEV ? "Development" : "Production");

export const APPLICATION_URL = URL_MAP[env] ?? URL_MAP["Production"];
