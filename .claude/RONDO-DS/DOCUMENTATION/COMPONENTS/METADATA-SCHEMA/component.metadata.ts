/**
 * Component Metadata Schema
 * Sections marked [REQUIRED], [STRONGLY RECOMMENDED], [OPTIONAL].
 */

export const componentMetadata = {

  // ─────────────────────────────────────────────────────────────────────────
  // [REQUIRED] component
  // Identity and registry information for this component.
  // ─────────────────────────────────────────────────────────────────────────
  component: {
    // Schema version — always "1.0.0" unless the schema itself changes.
    metadataVersion: "1.0.0",

    // Human-readable display name, e.g. "Primary Button", "Alert Dialog".
    name: "COMPONENT_NAME",

    // Atomic design level.
    //   "atoms"     — single-purpose, no composed children (Button, Icon, Badge)
    //   "molecules" — small composition of atoms (InputField, Card, MenuItem)
    //   "organisms" — complex, feature-level composition (Navbar, DataTable)
    category: "atoms", // atoms | molecules | organisms

    // One sentence: what does this component do?
    description: "One-sentence description of the component's purpose.",

    // Lifecycle status.
    //   "stable"       — production-ready, follows semver
    //   "beta"         — usable but API may change
    //   "experimental" — proof-of-concept, do not use in production
    //   "deprecated"   — use `deprecationNote` to point to the replacement
    status: "stable", // stable | beta | experimental | deprecated

    // Path from repo root to the component's source file.
    path: "src/components/Category/ComponentName/ComponentName.tsx",

    // Component semver — increment patch on style fixes, minor on new props,
    // major on breaking changes.
    version: "1.0.0",

    // ISO 8601 timestamps — set createdAt once, update updatedAt on changes.
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",

    // Only required when status === "deprecated".
    // Describe the migration path to the replacement.
    // deprecationNote: "Use <NewComponent> instead. Map prop X → prop Y.",
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [REQUIRED] anatomy
  // The element tree that makes up this component. This is the spine of the
  // schema — bindings, defaultStyles, and variants all reference element ids
  // defined here.
  // ─────────────────────────────────────────────────────────────────────────
  anatomy: {
    // The id of the outermost element.
    root: "root",

    // List every rendered element (DOM node or sub-component).
    // • id     — unique identifier referenced by other schema sections
    // • type   — HTML tag or component name, e.g. "button", "span", "Icon"
    // • children — ids of direct child elements (omit if none)
    // • accepts — slot name(s) this element accepts as children (omit if none)
    elements: [
      {
        id: "root",
        type: "button",
        children: ["label", "icon"],
      },
      {
        id: "label",
        type: "span",
      },
      {
        id: "icon",
        type: "Icon",
        // This element is optional — only rendered when the `icon` prop is set.
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [REQUIRED] props
  // Every configurable input to the component.
  // ─────────────────────────────────────────────────────────────────────────
  props: [
    {
      // Prop name as it appears in the component's TypeScript interface.
      name: "variant",

      // TypeScript type string.
      type: "'primary' | 'secondary' | 'ghost'",

      // Whether callers must always supply this prop.
      required: false,

      // Value used when the prop is omitted.
      default: "'primary'",

      // Can the prop be explicitly set to null?
      nullable: false,

      // Exhaustive list of accepted string/number literals (for enums).
      allowedValues: ["primary", "secondary", "ghost"],

      // Human-readable description — what does this prop control?
      description: "Visual style variant of the button.",

      // Set to true + add migrationNote when this prop is being removed.
      deprecated: false,
      // migrationNote: "Use `intent` instead.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: "'md'",
      nullable: false,
      allowedValues: ["sm", "md", "lg"],
      description: "Controls padding, font size, and icon scale.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      default: "false",
      nullable: false,
      description: "Prevents interaction and applies disabled visual treatment.",
    },
    {
      name: "onClick",
      type: "() => void",
      required: false,
      default: "undefined",
      nullable: true,
      description: "Callback fired on click when not disabled.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      nullable: false,
      description: "Label content rendered inside the button.",

      // Props that cannot be supplied at the same time as this one.
      // mutuallyExclusiveWith: ["iconOnly"],

      // Condition under which this prop becomes required.
      // requiredWhen: "iconOnly is false",

      // Condition under which this prop's value is valid.
      // validWhen: "value is a non-empty string or ReactNode",
    },
    // Add more props following the same shape…
  ],


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] bindings
  // Maps prop values to visual/structural effects on anatomy elements.
  // Agents use this to understand what actually changes when a prop is set.
  // ─────────────────────────────────────────────────────────────────────────
  bindings: [
    {
      // The prop whose value drives the change.
      prop: "variant",

      // The anatomy element id that is affected.
      element: "root",

      // What aspect of the element changes.
      //   "style"      — CSS class or token value changes
      //   "visibility" — element is shown or hidden
      //   "content"    — text or child content changes
      //   "attribute"  — HTML/ARIA attribute value changes
      affects: "style",

      // Prop value → effect. Keys are prop values; values describe the change.
      map: {
        primary: "Applies --color-primary background, white label",
        secondary: "Applies transparent background, --color-primary border and label",
        ghost: "No background or border, --color-primary label on hover",
      },
    },
    {
      prop: "disabled",
      element: "root",
      affects: "attribute",
      map: {
        true: "Sets disabled attribute, aria-disabled='true', cursor-not-allowed",
        false: "No disabled attribute",
      },
    },
    {
      prop: "icon",
      element: "icon",
      affects: "visibility",
      map: {
        defined: "Icon element is rendered",
        undefined: "Icon element is omitted from the DOM",
      },
    },
  ],


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] defaultStyles
  // Default visual styles applied to each anatomy element, expressed as
  // semantic design token references. Never reference primitive tokens here.
  // ─────────────────────────────────────────────────────────────────────────
  defaultStyles: [
    {
      // Anatomy element id.
      element: "root",

      // Token-keyed style map. Use CSS custom property names exactly as they
      // appear in tokens.css (e.g. "--color-primary", "--radius-md").
      styles: {
        backgroundColor: "var(--color-primary)",
        color: "var(--color-on-primary)",
        borderRadius: "var(--radius-md)",
        paddingInline: "var(--spacing-4)",
        paddingBlock: "var(--spacing-2)",
        fontSize: "var(--text-sm-size)",
        fontWeight: "var(--text-sm-weight)",
      },
    },
    {
      element: "label",
      styles: {
        color: "inherit",
        lineHeight: "var(--text-sm-line-height)",
      },
    },
  ],


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] behavior
  // States, transitions, interactions, responsive behavior, and side effects.
  // ─────────────────────────────────────────────────────────────────────────
  behavior: {
    // All possible component states.
    // For each state list which anatomy element ids are visually affected.
    states: [
      { name: "default",  affectedElements: ["root"] },
      { name: "hover",    affectedElements: ["root", "label"] },
      { name: "active",   affectedElements: ["root"] },
      { name: "focus",    affectedElements: ["root"] },
      { name: "disabled", affectedElements: ["root", "label", "icon"] },
      { name: "loading",  affectedElements: ["root", "label", "icon"] },
    ],

    // Parseable state machine: from → event → to.
    // Cover every reachable transition.
    stateTransitions: [
      { from: "default",  event: "mouseenter", to: "hover" },
      { from: "hover",    event: "mouseleave", to: "default" },
      { from: "hover",    event: "mousedown",  to: "active" },
      { from: "active",   event: "mouseup",    to: "hover" },
      { from: "default",  event: "focus",      to: "focus" },
      { from: "focus",    event: "blur",       to: "default" },
    ],

    // Keyboard and pointer interactions. Key: trigger, value: effect.
    interactions: {
      "Enter":     "Activates the button (same as click)",
      "Space":     "Activates the button (same as click)",
      "Tab":       "Moves focus to this button",
      "Shift+Tab": "Moves focus away from this button",
      "click":     "Fires onClick callback unless disabled",
    },

    // How layout or behavior shifts at breakpoints.
    // Key: breakpoint name, value: description of the change.
    responsiveBehavior: {
      mobile:  "Full-width by default; icon-only variant collapses label",
      tablet:  "Auto-width, label always visible",
      desktop: "Auto-width, label always visible",
    },

    // Describe non-visual side effects that happen when the component acts.
    // Agents need this to understand downstream consequences of using it.
    sideEffects: [
      // "Dispatches 'button:click' analytics event on activation",
      // "Triggers form submission when type='submit' inside a <form>",
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] usage
  // Use-case guidance and composition patterns for both humans and agents.
  // ─────────────────────────────────────────────────────────────────────────
  usage: {
    // Primary jobs this component is built to do.
    // Be specific — these drive agent keyword matching.
    useCases: [
      "Submit a form",
      "Trigger a primary action in a page header",
      "Confirm a dialog",
      "Navigate to next step in a multi-step flow",
    ],

    // Correct, named composition patterns with JSX examples.
    // Give each an id so other metadata files can reference it.
    commonPatterns: [
      {
        id: "primary-action",
        name: "Primary action button",
        description: "Default usage — prominent call-to-action.",
        composition: `
<Button variant="primary" onClick={handleSubmit}>
  Save changes
</Button>
        `.trim(),
      },
      {
        id: "icon-leading",
        name: "Button with leading icon",
        description: "Icon placed before the label for added visual context.",
        composition: `
<Button variant="primary" icon={<PlusIcon />} iconPosition="start">
  Add item
</Button>
        `.trim(),
      },
    ],

    // Patterns to avoid. Distinguish functional from compositional mistakes.
    antiPatterns: {
      // Wrong component for the job.
      functional: [
        {
          scenario: "Using Button for navigation",
          reason: "Buttons trigger actions; navigation is a link's job.",
          alternative: "Use <Link> or <NavLink> for in-app navigation.",
        },
      ],

      // Wrong way to nest or combine components.
      compositional: [
        {
          scenario: "Nesting a <Button> inside another <Button>",
          reason: "Invalid HTML — interactive elements cannot be nested.",
          alternative: "Use a single Button with a compound label.",
        },
        {
          scenario: "Placing raw text next to an icon without a label wrapper",
          reason: "Breaks icon alignment and screen-reader announcement.",
          alternative: "Always supply children as the visible label.",
        },
      ],
    },
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] agentSelection
  // Decision-making hints that help AI agents choose this component correctly.
  // ─────────────────────────────────────────────────────────────────────────
  agentSelection: {
    // Conditions that justify selecting this component.
    selectionCriteria: [
      "User needs to trigger a discrete, non-navigational action",
      "UI calls for a visually prominent call-to-action",
      "Form needs a submit or cancel control",
    ],

    // Words and phrases a developer might use when asking for this component.
    // Include synonyms, intent phrases, and domain vocabulary.
    keywords: [
      "button", "btn", "submit", "action", "click", "trigger",
      "call to action", "CTA", "confirm", "save", "cancel", "primary action",
    ],

    // When this component should be chosen over a similar one.
    // Key: competing component name, value: reason to prefer this one.
    preferredOver: {
      "Link":       "When the action does not change the URL",
      "IconButton": "When a visible text label is available",
    },

    // Conditions that block selection of this component.
    notWhen: [
      "The action navigates to another route — use Link",
      "The action is a destructive confirmation — use AlertDialog trigger",
      "Only an icon is available and space is very tight — use IconButton",
    ],

    // Free-form intent and audience notes for the agent.
    context:
      "Prefer this component whenever a user initiates an action. " +
      "Default to variant='primary' for the single most important action " +
      "on a surface; use 'secondary' for supporting actions.",
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] accessibility
  // Accessibility contract: what the component guarantees vs. what the
  // consumer must supply.
  // ─────────────────────────────────────────────────────────────────────────
  accessibility: {
    // ARIA roles applied automatically by the component (not by the consumer).
    ariaRoles: ["button"],

    // Supported key bindings and their effects.
    keyboardSupport: {
      "Enter": "Activates the button",
      "Space": "Activates the button",
      "Tab":   "Moves focus into the button",
    },

    // WCAG conformance level this component targets.
    wcagLevel: "AA", // A | AA | AAA

    // Specific WCAG 2.2 success criteria this component satisfies.
    wcagCriteria: [
      "1.4.3 Contrast (Minimum)",
      "2.1.1 Keyboard",
      "2.4.7 Focus Visible",
      "4.1.2 Name, Role, Value",
    ],

    // What the component handles automatically (consumers can rely on these).
    builtIn: [
      "role='button' is set on the root element",
      "aria-disabled is synced to the disabled prop",
      "Focus ring is visible in all focus states",
      "Minimum 44×44 px touch target on mobile",
    ],

    // What the implementing team must provide (will NOT work without these).
    consumerResponsibility: [
      "Supply a meaningful text label via children or aria-label",
      "Provide aria-label when used as an icon-only button",
      "Ensure onClick handler is keyboard-accessible (no mouse-only logic)",
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [STRONGLY RECOMMENDED] examples
  // Concrete, copy-paste-ready demonstrations of the component.
  // ─────────────────────────────────────────────────────────────────────────
  examples: {
    // Full pre-composed instances ready to drop into a page.
    instanceExamples: [
      {
        id: "default",
        name: "Default primary button",
        description: "The most common usage.",
        code: `<Button variant="primary" onClick={() => console.log('clicked')}>Save</Button>`,
      },
      {
        id: "disabled",
        name: "Disabled state",
        description: "Prevents interaction while communicating unavailability.",
        code: `<Button variant="primary" disabled>Save</Button>`,
      },
      {
        id: "ghost-action",
        name: "Ghost secondary action",
        description: "Low-emphasis action alongside a primary button.",
        code: `<Button variant="ghost" onClick={onCancel}>Cancel</Button>`,
      },
    ],

    // Content compositions for specific named slots (when the component has slots).
    slotContentExamples: [
      // {
      //   slot: "icon",
      //   description: "Leading icon using HugeIcons",
      //   code: `<PlusSignIcon size={16} />`,
      // },
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [OPTIONAL] tokens
  // Design token consumption at the component level.
  // Only fill this section when the token usage is non-obvious or when you
  // need to communicate which tokens are overridable per-instance.
  // ─────────────────────────────────────────────────────────────────────────
  tokens: {
    // Every semantic token this component reads from tokens.css.
    consumed: [
      "var(--color-primary)",
      "var(--color-on-primary)",
      "var(--color-primary-hover)",
      "var(--radius-md)",
      "var(--spacing-2)",
      "var(--spacing-4)",
      "var(--text-sm-size)",
      "var(--text-sm-weight)",
      "var(--text-sm-line-height)",
    ],

    // Tokens that consumers can override on a per-instance basis via CSS.
    overridable: [
      "var(--color-primary)",
      "var(--radius-md)",
    ],

    // Tokens that are system-locked and must NOT be overridden.
    enforced: [
      "var(--text-sm-size)",
      "var(--text-sm-weight)",
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [OPTIONAL] variants
  // Describes how specific prop combinations shift element styles or
  // availability. Most teams can infer this from `bindings`; fill this section
  // when a variant meaningfully restricts the available props or layout.
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    {
      id: "ghost",
      name: "Ghost variant",
      description: "Transparent, text-only button for low-emphasis actions.",

      // The prop values that activate this variant.
      configuration: { variant: "ghost" },

      // Per-element style overrides when this variant is active.
      elements: [
        {
          id: "root",
          styles: {
            backgroundColor: "transparent",
            border: "none",
            color: "var(--color-primary)",
          },
        },
      ],

      // Props that are only meaningful in this variant.
      // exclusiveProps: [],

      // Props that are disabled / ignored in this variant.
      // disabledProps: [],
    },
  ],


  // ─────────────────────────────────────────────────────────────────────────
  // [OPTIONAL] composition
  // Relationship graph: what this component requires, accepts, and lives inside.
  // ─────────────────────────────────────────────────────────────────────────
  composition: {
    // Component names this component cannot function without.
    requires: [],

    // Component names this component can accept as children.
    accepts: ["Icon"],

    // Component names this component must be placed inside.
    containedBy: [],

    // True when this component is part of a compound family
    // (e.g. Modal + Modal.Header + Modal.Body).
    isCompound: false,

    // Named slot definitions. Only needed for compound or slot-based components.
    slots: {
      // icon: {
      //   required: false,
      //   accepts: ["Icon"],
      //   description: "Optional icon rendered before or after the label.",
      //   defaultContent: null,
      // },
    },
  },


  // ─────────────────────────────────────────────────────────────────────────
  // [OPTIONAL] testing
  // Conventions for test authors and automated validators.
  // ─────────────────────────────────────────────────────────────────────────
  testing: {
    // data-testid values exposed by the component for stable test targeting.
    testIds: {
      root:  "button-root",
      label: "button-label",
      icon:  "button-icon",
    },

    // States that can be directly asserted in unit/integration tests.
    testableStates: ["default", "hover", "disabled", "focus"],

    // Behaviors that are hard to cover with automated tests — note manual steps.
    hardToTest: [
      "Loading spinner animation timing",
      "Touch target size on physical mobile devices",
    ],
  },

} as const;