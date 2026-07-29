import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="flex items-center gap-3">
      <Progress value={pct} className="flex-1" />
      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
        {current + 1} / {total}
      </span>
    </div>
  )
}
