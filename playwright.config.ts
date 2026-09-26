import { defineConfig, devices } from "@playwright/test"

const PORT = 5173
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    // PW_SLOWMO=<ms> slows every action for demo/debugging runs.
    launchOptions: { slowMo: Number(process.env.PW_SLOWMO ?? 0) },
  },
  // Bundled Chromium only — never the Chrome installed on the host machine.
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bun run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
