# understanding people personality test

Personality test based on [Dave Mitchell's](http://www.theleadershipdifference.com/who/dave-mitchell/) book ["The Power of Understanding People"](http://www.amazon.com/Power-Understanding-People-Strengthening-Organizational-ebook/dp/B00E1JO4Z8)

The user will be asked for their ranked preferences to 12 sets of 4 statements, and the results will be used to determine their personality style.

## data

The data for the personality test is defined in `src/lib/personality_data.json`:

  - `items`: an array of 12 sets of statements to be displayed to the user, containing: `seq`: item sequence, `a|b|c|d` column labels as keys and choice text as values
  - `people_types`: the four basic personality types, containing: `name`: personality type name, `minColumn`: which column to use
  - `people_styles`: the 12 personality styles. Each style is a pair of a major and a minor personality type.
  - `styles_desc`: a description of each personality style

## questions

For each of the 12 sets of statements the user should be asked:

> After you read these four statements, choose the one that you like the best and put click or tap it; click or tap the statement you like the next best; click or tap the next; the one you like the least is automatically selected. If you change your mind, you can click or tap the statement again to select a different one. Tap next to move on to the next set of statements.

For each choice the corresponding column, identified with `a`, `b`, `c`, `d`, the corresponding column score is incremented by 1 if the user selects that as their first choice, 2 if they select it as their second choice, 3 if they select it as their third choice, and 4 if they select it as their fourth choice.

The results are stored in an object with the following structure:

- column a, column b, column c, column d: the score for each column
- a flag indicating whether the user has completed the test
- the user's personality type
- the user's personality style (the algorithm section below)

The answers to the personality test are stored in the user's browser local storage. A progress bar is displayed at the top of the page to show the user's progress through the test.

When all answers are submitted, the description of the user's personality style is displayed.

## algorithm to determine personality style

| Type        | min score in column |
| ----------- | :-----------------: |
| romantic    | b |
| warrior     | d |
| expert      | a |
| mastermind  | c |


The major type (Lowest score in column x -- the rows below) compounded with the secondary type (Next lowest
score in column y -- the columns below)

| *major*      | romantic        | warrior       | expert      | mastermind    |
| -----------: | :-------------: | :-----------: | :---------: | :-----------: |
| *romantic*   | o               | crusader      | best friend | love interest
| *warrior*    | hired gun       | o             | sage        | power broker
| *expert*     | voice of reason | specialist    | o           | detective
| *mastermind* | social reformer | adventurer    | eccentric   | o

---

## developer notes

## React + TypeScript + Vite + shadcn/ui - Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
