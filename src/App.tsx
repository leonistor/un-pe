import { useCallback, useMemo, useState } from "react"
import type { ColumnKey, PeopleStyle, StyleDescription, ViewState } from "@/types"
import { useTestState } from "@/hooks/use-test-state"
import { calculateScores, determineStyle, findDescription, findStyle } from "@/lib/scoring"
import personalityData from "@/lib/personality_data.json"
import { Intro } from "@/components/intro"
import { ThemeToggle } from "@/components/theme-toggle"
import { QuestionCard } from "@/components/question-card"
import { ResultsView } from "@/components/results-view"

export function App() {
  const {
    state,
    setName,
    startTest,
    setRank,
    removeRank,
    nextQuestion,
    prevQuestion,
    completeTest,
    retake,
    getNextAvailableRank,
  } = useTestState()

  const [view, setView] = useState<ViewState>(() => {
    const hasProgress = Object.keys(state.answers).length > 0 && !state.completed
    return hasProgress ? "test" : "intro"
  })

  const items = personalityData.items

  const handleStart = useCallback(
    (name: string) => {
      startTest()
      setName(name)
      setView("test")
    },
    [startTest, setName],
  )

  const handleResume = useCallback(() => {
    setView("test")
  }, [])

  const handleNext = useCallback(() => {
    if (state.currentQuestion < items.length - 1) {
      nextQuestion()
    } else {
      completeTest()
      setView("results")
    }
  }, [state.currentQuestion, items.length, nextQuestion, completeTest])

  const handlePrev = useCallback(() => {
    prevQuestion()
  }, [prevQuestion])

  const handleRank = useCallback(
    (column: ColumnKey) => {
      const seq = items[state.currentQuestion].seq
      const nextRank = getNextAvailableRank(seq)
      setRank(seq, column, nextRank)
    },
    [state.currentQuestion, items, getNextAvailableRank, setRank],
  )

  const handleRemoveRank = useCallback(
    (column: ColumnKey) => {
      const seq = items[state.currentQuestion].seq
      removeRank(seq, column)
    },
    [state.currentQuestion, items, removeRank],
  )

  const handleRetake = useCallback(() => {
    retake()
    setView("intro")
  }, [retake])

  const result = useMemo<{
    style: PeopleStyle
    description: StyleDescription
  } | null>(() => {
    if (!state.completed) return null
    const scores = calculateScores(state.answers)
    const { lowestScore, nextLowestScore } = determineStyle(scores)
    const style = findStyle(lowestScore, nextLowestScore)
    if (!style) return null
    const description = findDescription(style.code)
    if (!description) return null
    return { style, description }
  }, [state.completed, state.answers])

  const currentItem = items[state.currentQuestion]
  const currentAnswers = state.answers[currentItem?.seq] ?? {}

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          {view !== "intro" && (
            <span className="text-sm font-medium">Understanding People</span>
          )}
        </div>
        <ThemeToggle />
      </div>

      {view === "intro" && (
        <Intro
          onStart={handleStart}
          hasSavedProgress={Object.keys(state.answers).length > 0 && !state.completed}
          onResume={handleResume}
        />
      )}

      {view === "test" && currentItem && (
        <QuestionCard
          item={currentItem}
          currentIndex={state.currentQuestion}
          total={items.length}
          ranks={currentAnswers}
          onRank={handleRank}
          onRemoveRank={handleRemoveRank}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      {view === "results" && result && (
        <ResultsView
          name={state.name}
          style={result.style}
          description={result.description}
          onRetake={handleRetake}
        />
      )}
    </div>
  )
}

export default App
