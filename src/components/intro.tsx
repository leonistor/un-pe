import { Button } from "@/components/ui/button"

interface IntroProps {
  onStart: () => void
  hasSavedProgress: boolean
  onResume: () => void
}

export function Intro({ onStart, hasSavedProgress, onResume }: IntroProps) {
  return (
    <div className="flex max-w-prose flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium">Understanding People</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Personality Assessment
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        This personality test is based on Dave Mitchell&apos;s book{" "}
        <em>The Power of Understanding People</em>.
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        You will be asked to rank 12 sets of 4 statements. For each set,
        tap the statement you like best, then the one you like next best,
        and so on. Your results will reveal your personality style.
      </p>

      <div className="flex gap-3">
        {hasSavedProgress ? (
          <>
            <Button onClick={onResume}>Resume Test</Button>
            <Button variant="outline" onClick={onStart}>
              Start Over
            </Button>
          </>
        ) : (
          <Button onClick={onStart}>Start Test</Button>
        )}
      </div>
    </div>
  )
}
