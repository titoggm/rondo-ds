# Atomic Design in Rondo

> Agent-facing reference. Maps Brad Frost's atomic design methodology onto Rondo's real folder and file conventions.
> Upstream theory: `agentic-ds-infra-docs/atomic-design-methodology.md` (Brad Frost, _Atomic Design_ ch. 2)

---

## The Mental Model

Atomic design organizes UI into five composition layers — atoms, molecules, organisms, templates, and pages — ordered from simplest to most complex. Each layer is built from the layers below it. This is **not a linear process**: it is a mental model that lets you reason about any piece of UI as both a standalone unit and as a part of a larger whole simultaneously. An agent uses this model to answer two questions: _what layer does this component belong to?_ and _where does it live in the repo?_

---

## The Five Stages in Rondo

### Atoms

- **Definition:** UI elements that cannot be broken down further without ceasing to function; they wrap a single HTML element or a single Radix primitive.
- **In Rondo:** `src/components/atoms/<name>/`
- **Composed of:** One root HTML element (or one Radix primitive) only. Must not import any other Rondo component.
- **Examples (live):** `avatar`, `badge`, `button`, `checkbox`, `input`, `label`, `separator`, `skeleton`, `textarea`
- **Heuristics:**
  - If you can remove everything and still have one meaningful interactive or semantic element, it is an atom.
  - If it uses a Radix primitive (e.g. `Slot`, `Checkbox.Root`), it wraps exactly that one primitive.
  - Its CSS Module and CVA variants style only that one root element.
  - It has no knowledge of layout or page context.

**Representative pattern (`atoms/button/button.tsx`):**

```tsx
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"
import styles from "./button.module.css"

const buttonVariants = cva(styles.base, {
  variants: {
    variant: { default: styles.variantDefault, outline: styles.variantOutline, … },
    size:    { default: styles.sizeDefault, sm: styles.sizeSm, … },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function Button({ variant, size, asChild, ...props }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" data-variant={variant} data-size={size}
               className={buttonVariants({ variant, size })} {...props} />
}
```

---

### Molecules

- **Definition:** A small, focused group of atoms (or atoms + one other molecule) that form a single reusable unit with one clear responsibility.
- **In Rondo:** `src/components/molecules/<name>/`
- **Composed of:** Atoms, and optionally one level of molecule nesting. Must not span a full page section on its own.
- **Examples (live):** `alert`, `breadcrumb`, `card`, `dropdown-menu`, `pagination`, `popover`, `select`, `tabs`, `tooltip`
- **Heuristics:**
  - It does one thing well ("search bar", "notification card", "tab strip").
  - It may be a **compound component**: multiple exported parts (e.g. `Card` / `CardHeader` / `CardContent` / `CardFooter`) that share a single folder and work together, but each part is still simple.
  - It still has no opinion about page layout or grid placement.
  - If removing one atom makes the molecule meaningless (e.g. remove the input from a search molecule and you have nothing), the atom belongs inside this molecule.

**Representative pattern (`molecules/card/card.tsx` — compound component):**

```tsx
function Card({ size = "default", ...props }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(styles.card)}
      {...props}
    />
  );
}
function CardHeader(props) {
  return <div data-slot="card-header" className={styles.header} {...props} />;
}
function CardTitle(props) {
  return <div data-slot="card-title" className={styles.title} {...props} />;
}
// … CardDescription, CardAction, CardContent, CardFooter
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
```

---

### Organisms

- **Definition:** Relatively complex UI components composed of molecules and/or atoms that form a **distinct, standalone section** of an interface (e.g. a site header, a sidebar nav, a product grid).
- **In Rondo:** `src/components/organisms/<name>/` _(folder exists; no components yet — this layer is valid and awaiting its first component)_
- **Composed of:** Molecules, atoms, and/or other organisms. Has its own section-level layout.
- **Examples (live):** _(none yet)_
- **Heuristics:**
  - It represents a named section of a page, not just a widget.
  - It orchestrates multiple molecules — if you dropped it into a page you would call it a "block" or "section."
  - It may have its own internal layout (grid, flex row) that is meaningful on its own.
  - If it only combines two atoms, it is still a molecule.

---

### Templates

- **Definition:** Page-level layout shells that arrange organisms and molecules into a structural skeleton; they define _where_ content goes, not _what_ the content is.
- **In Rondo:** `src/components/templates/<name>/` _(folder exists; no components yet — this layer is valid and awaiting its first component)_
- **Composed of:** Organisms, molecules, and layout primitives (grid, flex wrappers). No real content — uses placeholder props or slots.
- **Examples (live):** _(none yet)_
- **Heuristics:**
  - It is a reusable layout that multiple pages can share.
  - It accepts slots/children and renders organisms in fixed positions.
  - It has no routing logic and no data-fetching.
  - Strip the real content out: if the skeleton still communicates the page structure, it is a template.

---

### Pages

- **Definition:** Concrete instances of templates populated with real content, representing what users actually see.
- **In Rondo:** `src/app/**` (Next.js App Router routes) — **there is no `src/components/pages/` folder.**
- **Composed of:** A template component + real data passed as props or fetched server-side.
- **Examples (live):** `src/app/page.tsx` (root route), `src/app/layout.tsx` (root layout shell)
- **Heuristics:**
  - It lives in `src/app/`, not `src/components/`.
  - It is a Next.js route segment (a file named `page.tsx` or `layout.tsx`).
  - It passes real content (strings, images, fetched data) into a template.
  - Variations in content (e.g. logged-in vs guest) are expressed here, not in the template.

> **Important:** When placing a new component, never create a `src/components/pages/` folder. Page-layer work always goes to `src/app/`.

---

## Classification Decision Rules

Apply these rules **in order** — stop at the first match.

1. **Atom** — wraps exactly one HTML element or one Radix primitive; imports no other Rondo component; has a single root.
2. **Molecule** — small, focused group of atoms (or atoms + one molecule); does one thing; no page-section scope.
3. **Organism** — assembles molecules/atoms into a distinct, named page section; has section-level layout; could stand alone on a page as a recognizable "block."
4. **Template** — a reusable layout skeleton that places organisms/molecules in fixed regions; contains no real content.
5. **Page** — a Next.js route in `src/app/`; renders a template with real data; is not a reusable component.

### Worked Edge Cases

**`Card` — why molecule, not organism?**
`Card` is a compound component (`Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`) but each part wraps a single `div`. The molecule has one responsibility (surface a content block with a standard header/body/footer structure). It has no opinion about surrounding layout. If a component were to place multiple Cards in a grid it would own section-level layout → that grid component would be the organism.

**Icon-only `Button` — still an atom?**
Yes. Even rendered as `<Button size="icon"><SearchIcon /></Button>`, the component itself is still a single `button` element wrapping arbitrary children. Children do not change the atom's classification; the atom's own structure does.

**A login form (inputs + labels + button + error message) — molecule or organism?**
If the form is self-contained ("do one thing: collect credentials") it is a **molecule**. If the form is embedded inside a larger sign-in panel that also contains a header, social login alternatives, and a footer link — and that panel constitutes a distinct page section — the panel is the **organism** and the form inside it is the molecule.

---

## Where Atomic Design Stops and Rondo Conventions Take Over

Atomic design is technology-agnostic: it defines _layers_, not implementation. Everything below is Rondo-specific:

| Concern                    | Rondo convention                                                    | Reference            |
| -------------------------- | ------------------------------------------------------------------- | -------------------- |
| Styling                    | CSS Modules (`.module.css` co-located, not every component has one) | `CLAUDE.md`          |
| Variants                   | CVA mapping variant keys → CSS Module class names                   | `CLAUDE.md`          |
| Tokens                     | Semantic tokens only (`var(--color-primary)`, never primitives)     | `TOKENS-SYSTEM.md`   |
| Behavior / a11y            | Radix UI primitives                                                 | `CLAUDE.md`          |
| Machine-readable layer tag | `component.category` in `*.metadata.ts`                             | `METADATA-SCHEMA.md` |
| Per-component docs         | Component-level metadata and docs                                   | `COMPONENTS-.md`     |
| Metadata schema            | Full field reference                                                | `METADATA-SYSTEM.md` |

---

## File Anatomy per Component

Every component folder follows the same convention regardless of layer:

```
src/components/<layer>/<name>/
  <name>.tsx          # Component implementation
  <name>.module.css   # CSS Module (present for most; some molecules omit it)
  <name>.test.tsx     # Vitest + Testing Library
  index.ts            # Barrel export
  <name>.metadata.ts  # Optional; present when metadata has been generated
```

The `<name>.metadata.ts` file's `component.category` field is the machine-readable atomic-design layer:

- `"atoms"` → `src/components/atoms/`
- `"molecules"` → `src/components/molecules/`
- `"organisms"` → `src/components/organisms/`
- `"templates"` → `src/components/templates/`
- Pages have no metadata file — they are Next.js routes.

---

## Quick Reference

| Stage     | Rondo location                        | `metadata.category`  | One-line rule                                       |
| --------- | ------------------------------------- | -------------------- | --------------------------------------------------- |
| Atoms     | `src/components/atoms/`               | `"atoms"`            | Single element or Radix primitive; no Rondo imports |
| Molecules | `src/components/molecules/`           | `"molecules"`        | Small group of atoms; one responsibility            |
| Organisms | `src/components/organisms/` _(empty)_ | `"organisms"`        | Distinct page section; orchestrates molecules       |
| Templates | `src/components/templates/` _(empty)_ | `"templates"`        | Layout skeleton; no real content                    |
| Pages     | `src/app/**`                          | _(no metadata file)_ | Next.js route; real content; not a component        |
