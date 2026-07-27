import { useCallback } from "react"
import type { ColumnKey, Item, Rank } from "@/types"
import { Statement } from "./statement"
import { ProgressBar } from "./progress-bar"

interface QuestionCardProps {
  item: Item
  currentIndex: number
  total: number
  ranks: Partial<Record<ColumnKey, number | null>>
  onRank: (column: ColumnKey) => void
  onRemoveRank: (column: ColumnKey) => void
  onNext: () => void
  onPrev: () => void
}

const COLUMNS: ColumnKey[] = ["a", "b", "c", "d"]

export function QuestionCard({
  item,
  currentIndex,
  total,
  ranks,
  onRank,
  onRemoveRank,
  onNext,
  onPrev,
}: QuestionCardProps) {
  const rankedCount = Object.values(ranks).filter(Boolean).length
  const allRanked = rankedCount === 4

  const handleClick = useCallback(
    (column: ColumnKey) => {
      if (ranks[column]) {
        onRemoveRank(column)
      } else {
        onRank(column)
      }
    },
    [ranks, onRank, onRemoveRank],
  )

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar current={currentIndex} total={total} />

      <p className="text-sm leading-relaxed text-muted-foreground">
        Read the four statements below, then tap the one you like best,
        then the one you like next best, and so on.
      </p>

      <div className="flex flex-col gap-2">
        {COLUMNS.map((col) => (
          <Statement
            key={col}
            text={item[col]}
            column={col}
            rank={(ranks[col] as Rank | null) ?? null}
            onClick={handleClick}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="text-sm text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          Back
        </button>

        {currentIndex < total - 1 ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!allRanked}
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!allRanked}
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-40"
          >
            See Results
          </button>
        )}
      </div>
    </div>
  )
}
