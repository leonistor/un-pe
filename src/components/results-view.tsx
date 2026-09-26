import type { PeopleStyle, StyleDescription } from "@/types"
import { Badge } from "@/components/ui/badge"
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
    <div className="flex w-full flex-col gap-8">
      <div>
        <p className="eyebrow">{name}, your personality style</p>
        <h1 className="text-hero mt-1 font-medium">{style.name}</h1>
        {description.headline && (
          <p className="prose-muted mt-2 italic">{description.headline}</p>
        )}
      </div>

      {description.words && description.words.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {description.words.map((word) => (
            <Badge
              key={word}
              variant="secondary"
              className="h-auto px-3 py-1 text-xs"
            >
              {word}
            </Badge>
          ))}
        </div>
      )}

      {description.short && (
        <p className="text-body leading-relaxed text-foreground">
          {description.short}
        </p>
      )}

      <div className="flex flex-col gap-6">
        {description.leaders && (
          <section>
            <h2 className="section-title">As a Leader</h2>
            <p className="prose-muted">
              {description.leaders}
            </p>
          </section>
        )}

        {description.sales && (
          <section>
            <h2 className="section-title">In Sales</h2>
            <p className="prose-muted">
              {description.sales}
            </p>
          </section>
        )}

        {description.service && (
          <section>
            <h2 className="section-title">In Service</h2>
            <p className="prose-muted">
              {description.service}
            </p>
          </section>
        )}

        {description.team && (
          <section>
            <h2 className="section-title">As a Team Member</h2>
            <p className="prose-muted">
              {description.team}
            </p>
          </section>
        )}

        {description.quickref && (
          <section>
            <h2 className="section-title">Quick Reference</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {description.quickref.leadership && (
                <div>
                  <h3 className="eyebrow mb-1">
                    Leadership
                  </h3>
                  <ul className="list-inside list-disc text-body text-muted-foreground">
                    {description.quickref.leadership.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {description.quickref.sales && (
                <div>
                  <h3 className="eyebrow mb-1">
                    Sales
                  </h3>
                  <ul className="list-inside list-disc text-body text-muted-foreground">
                    {description.quickref.sales.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {description.quickref.service && (
                <div>
                  <h3 className="eyebrow mb-1">
                    Service
                  </h3>
                  <ul className="list-inside list-disc text-body text-muted-foreground">
                    {description.quickref.service.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {description.quickref.team && (
                <div>
                  <h3 className="eyebrow mb-1">
                    Team
                  </h3>
                  <ul className="list-inside list-disc text-body text-muted-foreground">
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
