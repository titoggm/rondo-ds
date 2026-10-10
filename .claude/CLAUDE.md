# Rondo Agentic Design System

Our goal is to develop an agentic design system infrastructure

### Rondo Tech Stack

- **Framework**: Next.js 16 + React 19
- **Language**: TypeScript (strict)
- **Tokens**: W3C Design Tokens → Style Dictionary v4 → CSS Custom Properties (https://github.com/style-dictionary/style-dictionary)
- **Styling**: CSS Modules (one `.module.css` co-located per component). No Tailwind.
- **Variants**: CVA — maps variant keys to CSS Module class names (not utility strings)
- **Primitives**: Radix UI (accessibility/behavior)
- **Icons**: HugeIcons
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook + Pulse (not yet installed)
- **Quality**: ESLint 9 + Prettier + Husky + Commitlint (not yet installed)

`npm run tokens` compiles both into `src/tokens/generated/tokens.css 
`tokens.css`is generated — never hand-edit it. It is imported once in`src/app/globals.css`.

### Operational Rules

- npm/npx always. Zero exceptions.
- After editing any `src/tokens/*.json`, re-run `npm run tokens` to regenerate `tokens.css`.