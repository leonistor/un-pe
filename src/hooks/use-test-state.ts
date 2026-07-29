import { useCallback, useEffect, useState } from "react"
import type { ColumnKey, Rank, TestState as TestStateType } from "@/types"

const STORAGE_KEY = "un-pe-test-state"

function loadState(): TestStateType | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as TestStateType
  } catch {
    return null
  }
}

function saveState(state: TestStateType) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable or full
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // noop
  }
}

export function useTestState() {
  const [state, setState] = useState<TestStateType>(() => {
    const saved = loadState()
    if (saved && !saved.completed) return { ...saved, name: saved.name ?? "" }
    return { name: "", currentQuestion: 0, answers: {}, completed: false }
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  const setName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, name }))
  }, [])

  const startTest = useCallback(() => {
    setState({ name: "", currentQuestion: 0, answers: {}, completed: false })
  }, [])

  const setRank = useCallback(
    (questionSeq: number, column: ColumnKey, rank: Rank) => {
      setState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionSeq]: {
            ...prev.answers[questionSeq],
            [column]: rank,
          },
        },
      }))
    },
    [],
  )

  const removeRank = useCallback((questionSeq: number, column: ColumnKey) => {
    setState((prev) => {
      const itemAnswers = { ...prev.answers[questionSeq] }
      delete itemAnswers[column]
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionSeq]: itemAnswers,
        },
      }
    })
  }, [])

  const nextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }))
  }, [])

  const prevQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1),
    }))
  }, [])

  const completeTest = useCallback(() => {
    setState((prev) => ({ ...prev, completed: true }))
  }, [])

  const retake = useCallback(() => {
    clearState()
    setState({ name: "", currentQuestion: 0, answers: {}, completed: false })
  }, [])

  const getRankedCount = useCallback(
    (questionSeq: number): number => {
      const itemAnswers = state.answers[questionSeq]
      if (!itemAnswers) return 0
      return Object.values(itemAnswers).filter(Boolean).length
    },
    [state.answers],
  )

  const getNextAvailableRank = useCallback(
    (questionSeq: number): Rank => {
      const itemAnswers = state.answers[questionSeq] ?? {}
      const usedRanks = new Set(Object.values(itemAnswers).filter(Boolean))
      for (let r = 1; r <= 4; r++) {
        const rank = r as Rank
        if (!usedRanks.has(rank)) return rank
      }
      return 4 as Rank
    },
    [state.answers],
  )

  return {
    state,
    setName,
    startTest,
    setRank,
    removeRank,
    nextQuestion,
    prevQuestion,
    completeTest,
    retake,
    getRankedCount,
    getNextAvailableRank,
  }
}
