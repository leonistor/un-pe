import type { ColumnKey, Rank } from "@/types"
import { cn } from "@/lib/utils"

interface StatementProps {
  text: string
  column: ColumnKey
  rank: Rank | null
  onClick: (column: ColumnKey) => void
}

export function Statement({ text, column, rank, onClick }: StatementProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(column)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all",
        rank
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-medium",
          rank
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {rank ?? "-"}
      </span>
      <span className="leading-snug">{text}</span>
    </button>
  )
}
