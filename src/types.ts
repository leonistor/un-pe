export type ColumnKey = "a" | "b" | "c" | "d"

export type Rank = 1 | 2 | 3 | 4

export interface Item {
  seq: number
  a: string
  b: string
  c: string
  d: string
}

export interface PeopleType {
  name: string
  minColumn: ColumnKey
  partner: string
}

export interface PeopleStyle {
  name: string
  code: string
  lowestScore: ColumnKey
  nextLowestScore: ColumnKey
  majorType: string
  secondaryType: string
}

export interface StyleDescription {
  code: string
  headline?: string
  short?: string
  words?: string[]
  leaders?: string
  sales?: string
  service?: string
  team?: string
  hollywood?: string
  quickref?: {
    leadership?: string[]
    sales?: string[]
    service?: string[]
    team?: string[]
  }
}

export type Answers = Partial<Record<number, Partial<Record<ColumnKey, Rank>>>>

export type ViewState = "intro" | "test" | "results"

export interface TestState {
  name: string
  currentQuestion: number
  answers: Answers
  completed: boolean
}
