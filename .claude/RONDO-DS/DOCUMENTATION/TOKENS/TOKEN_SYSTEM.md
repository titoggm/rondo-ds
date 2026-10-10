> README: This is a work in progress

# Token System

## Token Heirarchy

### Layer 1: Primitive Tokens

These are the most basic form of tokens. Raw foundational design values.

Example: `--color-primary-500: #005BF2;`

### Layer 2: Semantic Tokens

Tokens that express intent, not raw values. These are what components should use. These tokens are “semantic” in that they carry meaning and imply how and where they should be applied.

Example: `--color-action-background-primary: var(--color-primary-500)`

### Layer 3: Component Tokens

These tokens are specific to individual components and generally refer to semantic tokens.

Example: `--button-color-background-primary-hovered: var(--color-action-background-primary)`

## Token Naming Pattern Levels

1. `Namespace`
2. `Object`
3. `Base`
4. `Modifiers`

## Token Naming Pattern

`[system] - [component] - [element] - [category] - [purpose] - [property] - [variant] - [emphasis] - [state] - [scale]`

### Namespace

Prefixes that scope a token to a broader context.

- **system** — Fixed prefix scoping a token to the design system.

### Object

Levels that tie a token to a specific UI structure rather than a global style. Only used in component tokens.

- **component** — A token scoped to one component.
- **element** — A token scoped to a sub-part of a component.

### Base

- **category** — The broad type of design value the token represents.
- **purpose** — A meaningful group within a category, used to organize tokens by purpose.
- **property** — The specific part of that category being styled.

### Modifier

- **variant** — A specific version or use case that distinguishes one token from others with the same purpose and property.
- **emphasis** — The relative visual weight or intensity of a color value, independent of its semantic meaning.
- **state** — How that version is currently behaving.
- **scale** — A token's position along an ordered range of size, intensity, or magnitude.

## Token Naming Rules

1. Namespace goes first
2. Object comes right after namespace - if the token belongs to one specific component (like a button or input), name it next.
3. Object level is ONLY used for component tokens.
4. Base sits in the middle - the core meaning of the token.
5. Base is ordered by hierarchical strictness (category -> purpose -> property, Ex: color-interactive-background).
6. Modifiers go last
7. Only add the levels you actually need. Don't tack on every possible word "just in case." If a name doesn't need a scale, mode, or state, leave it out. Some levels are genuinely optional and should be omitted when they don't add distinguishing purpose. Include only the levels needed to sufficiently describe and distinguish purposeful intent.
8. When a purposeful decision could legitimately be classified under more than one token level or concept, don't duplicate the raw value pick one location as the source of truth and alias the other(s) to it.

## Token Usage Rules

1. Consume the semantic token directly. Only create a component token when the component needs something the semantic token alone can't give it.
2. Default: Never skip semantic tokens — they’re what makes refactors safe. Component tokens should reference semantic tokens, semantic tokens reference primitive tokens.
3. Use the semantic token directly when:

- The component maps one semantic value to one property, with no state or part-specific divergence — if a component just maps one semantic value to one property, adding a component layer in between is pure overhead.
- The value will behave identically across every theme, brand, or tenant you plan to support — it's never going to need to diverge independently from what the semantic token already means.
- The component belongs to a broader "family" that already shares a semantic decision (e.g., all form fields inherit the same border logic) — forking a token per component here just fragments something that's already consistent.

4. Create a component token when:

- The component needs state- or part-specific bindings off a single semantic decision — e.g., button-background-primary-default and button-background-primary-hover both need their own addressable name, even if both currently resolve through the same semantic source. Component tokens apply a semantic decision to specific parts and states of a component, functioning like an instance of a semantic token.
- The component needs an independent override point for theming — a place a specific brand/tenant/theme can swap a value without that change rippling to every other consumer of the underlying semantic token. Component tokens are valuable for theming scenarios where component-specific attributes need to shift to give a theme its own look and feel.
- The component is complex enough (many variants × states × sub-parts) that a dedicated token layer makes the design-to-code mapping legible for engineers working across platforms.

5. Signs you've over-created a component token (worth a periodic audit):

- It's a straight rename of a semantic token with zero divergence anywhere — no state logic, no theme variance. Component tokens that just repeat semantic tokens with a new name and no intermediate logic add a layer with no benefit. Substack
- Its value never changes across any theme or variant that exists today or is planned.
- Multiple component properties each get their own token when they could legitimately share one semantic reference.
