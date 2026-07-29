import type { PeopleStyle, StyleDescription } from "@/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ResultsViewProps {
  name: string
  style: PeopleStyle
  description: StyleDescription
  onRetake: () => void
}

export function ResultsView({
  name,
  style,
  description,
  onRetake,
}: ResultsViewProps) {
  return (
    <div className="flex max-w-prose flex-col gap-8">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {name}, your personality style
        </p>
        <h1 className="mt-1 text-3xl font-medium">{style.name}</h1>
        {description.headline && (
          <p className="mt-2 text-sm italic text-muted-foreground">
            {description.headline}
          </p>
        )}
      </div>

      {description.words && description.words.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {description.words.map((word) => (
            <span
              key={word}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {word}
            </span>
          ))}
        </div>
      )}

      {description.short && (
        <p className="text-sm leading-relaxed text-foreground">
          {description.short}
        </p>
      )}

      <div className="flex flex-col gap-6">
        {description.leaders && (
          <section>
            <h2 className="mb-2 text-sm font-medium">As a Leader</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description.leaders}
            </p>
          </section>
        )}

        {description.sales && (
          <section>
            <h2 className="mb-2 text-sm font-medium">In Sales</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description.sales}
            </p>
          </section>
        )}

        {description.service && (
          <section>
            <h2 className="mb-2 text-sm font-medium">In Service</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description.service}
            </p>
          </section>
        )}

        {description.team && (
          <section>
            <h2 className="mb-2 text-sm font-medium">As a Team Member</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description.team}
            </p>
          </section>
        )}

        {description.quickref && (
          <section>
            <h2 className="mb-2 text-sm font-medium">Quick Reference</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {description.quickref.leadership && (
                <div>
                  <h3 className="mb-1 text-xs font-medium text-muted-foreground">
                    Leadership
                  </h3>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {description.quickref.leadership.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {description.quickref.sales && (
                <div>
                  <h3 className="mb-1 text-xs font-medium text-muted-foreground">
                    Sales
                  </h3>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {description.quickref.sales.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {description.quickref.service && (
                <div>
                  <h3 className="mb-1 text-xs font-medium text-muted-foreground">
                    Service
                  </h3>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {description.quickref.service.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {description.quickref.team && (
                <div>
                  <h3 className="mb-1 text-xs font-medium text-muted-foreground">
                    Team
                  </h3>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {description.quickref.team.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <Separator />
      <div className="pt-6">
        <Button onClick={onRetake} variant="outline">
          Retake Test
        </Button>
      </div>
    </div>
  )
}
