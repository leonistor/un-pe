import { expect, test, type Page } from "@playwright/test"

const STORAGE_KEY = "un-pe-test-state"
const TOTAL_SETS = 12

// Statement buttons are the only ones with a rank-badge span child.
function statements(page: Page) {
  return page.locator("button:has(span.size-6)")
}

function progress(page: Page) {
  return page.locator("span.tabular-nums")
}

async function rankAllStatements(page: Page) {
  const count = await statements(page).count()
  for (let i = 0; i < count; i++) {
    await statements(page).nth(i).click()
  }
}

test("intro renders and starts the test", async ({ page }) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", { name: "Understanding People" }),
  ).toBeVisible()

  await page.getByPlaceholder(/your name/i).fill("Test User")
  await page.getByRole("button", { name: "Start Test" }).click()

  await expect(progress(page)).toHaveText(`1 / ${TOTAL_SETS}`)
  await expect(statements(page)).toHaveCount(4)
})

test("ranking every set reveals a personality style", async ({ page }) => {
  await page.goto("/")
  await page.getByPlaceholder(/your name/i).fill("Test User")
  await page.getByRole("button", { name: "Start Test" }).click()

  for (let q = 0; q < TOTAL_SETS; q++) {
    await expect(progress(page)).toHaveText(`${q + 1} / ${TOTAL_SETS}`)
    await rankAllStatements(page)

    if (q < TOTAL_SETS - 1) {
      await page.getByRole("button", { name: "Next", exact: true }).click()
    } else {
      await page.getByRole("button", { name: "See Results" }).click()
    }
  }

  await expect(
    page.getByText("Test User, your personality style", { exact: true }),
  ).toBeVisible()
  await expect(page.getByRole("button", { name: "Retake Test" })).toBeVisible()
})

test("resumes a saved in-progress test from localStorage", async ({ page }) => {
  await page.addInitScript(
    ({ key, state }) => localStorage.setItem(key, JSON.stringify(state)),
    {
      key: STORAGE_KEY,
      state: {
        name: "Resume User",
        currentQuestion: 0,
        answers: { 1: { a: 1, b: 2, c: 3, d: 4 } },
        completed: false,
      },
    },
  )

  await page.goto("/")

  await expect(progress(page)).toHaveText(`1 / ${TOTAL_SETS}`)
  await expect(statements(page)).toHaveCount(4)
  await expect(
    page.getByRole("button", { name: "Next", exact: true }),
  ).toBeEnabled()
})
