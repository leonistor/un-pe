import { SquaresFourIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  /** Mark size in pixels. */
  size?: number
  /** Toggle the "Understanding People" wordmark next to the mark. */
  showWordmark?: boolean
}

/**
 * Brand lockup for "Understanding People".
 *
 * Rendered in the sticky app header (`App.tsx`). The mark uses Phosphor's
 * `SquaresFour` as a monochrome, theme-aware echo of the four-quadrant favicon
 * (`public/personality-icon.svg`), which stays multi-coloured so it remains
 * legible at small favicon sizes. Four squares map to the test's four
 * personality types.
 */
export function Logo({ className, size = 20, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <SquaresFourIcon
        size={size}
        weight="fill"
        className="shrink-0 text-primary"
        aria-hidden="true"
      />
      {showWordmark && (
        <span className="text-sm font-medium tracking-tight">
          Understanding People
        </span>
      )}
    </span>
  )
}
