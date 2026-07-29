import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface IntroProps {
  onStart: (name: string) => void
  hasSavedProgress: boolean
  onResume: () => void
}

const NICKNAMES = [
  "Captain Clicks",
  "Ranking Raccoon",
  "The Personality Pirate",
  "Quizzy McQuizface",
  "Data Destroyer",
  "The Rankinator",
  "Mystery McMysteryface",
  "The Profile Pundit",
  "Sir Sorts-a-Lot",
  "The Trait Detective",
  "Lady Leader",
  "The Pattern Seeker",
]

function randomNickname(): string {
  return NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]
}

export function Intro({ onStart, hasSavedProgress, onResume }: IntroProps) {
  const [name, setName] = useState("")

  const handleStart = () => {
    onStart(name.trim() || randomNickname())
  }

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

      <Input
        placeholder="Your name (or leave blank for a surprise nickname)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleStart()
        }}
      />

      <div className="flex gap-3">
        {hasSavedProgress ? (
          <>
            <Button onClick={onResume}>Resume Test</Button>
            <Button variant="outline" onClick={handleStart}>
              Start Over
            </Button>
          </>
        ) : (
          <Button onClick={handleStart}>Start Test</Button>
        )}
      </div>
    </div>
  )
}
