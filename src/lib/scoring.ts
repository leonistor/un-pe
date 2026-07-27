import type { Answers, ColumnKey, PeopleStyle, StyleDescription } from "@/types"
import personalityData from "./personality_data.json"

const COLUMN_TYPE_MAP: Record<ColumnKey, string> = {
  a: "expert",
  b: "romantic",
  c: "mastermind",
  d: "warrior",
}

export function calculateScores(answers: Answers): Record<ColumnKey, number> {
  const scores: Record<ColumnKey, number> = { a: 0, b: 0, c: 0, d: 0 }

  for (const itemAnswers of Object.values(answers)) {
    if (!itemAnswers) continue
    for (const [col, rank] of Object.entries(itemAnswers)) {
      if (rank) {
        scores[col as ColumnKey] += rank
      }
    }
  }

  return scores
}

export function determineStyle(
  scores: Record<ColumnKey, number>,
): {
  majorType: string
  secondaryType: string
  lowestScore: ColumnKey
  nextLowestScore: ColumnKey
} {
  const entries = Object.entries(scores) as [ColumnKey, number][]
  entries.sort((a, b) => a[1] - b[1])

  const lowestScore = entries[0][0]
  const nextLowestScore = entries[1][0]

  return {
    majorType: COLUMN_TYPE_MAP[lowestScore],
    secondaryType: COLUMN_TYPE_MAP[nextLowestScore],
    lowestScore,
    nextLowestScore,
  }
}

export function findStyle(
  lowestScore: ColumnKey,
  nextLowestScore: ColumnKey,
): PeopleStyle | undefined {
  return personalityData.people_styles.find(
    (s) => s.lowestScore === lowestScore && s.nextLowestScore === nextLowestScore,
  ) as PeopleStyle | undefined
}

export function findDescription(code: string): StyleDescription | undefined {
  return personalityData.styles_descriptions.find((d) => d.code === code)
}
