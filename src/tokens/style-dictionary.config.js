/**
 * Rondo DS — Style Dictionary build
 *
 * Compiles the W3C design token JSONs in this folder into CSS custom
 * properties at src/tokens/generated/tokens.css.
 *
 * Two-layer token system:
 *   - Primitives (colors, typography, spacing, ...) emit literal values.
 *   - Semantics reference primitives, so they are emitted as
 *     `var(--primitive)` (outputReferences) to keep the layering legible.
 *
 * Colors carry an optional dark override under
 * `$extensions.rondo.dark`; those are emitted into a `.dark { ... }` block.
 *
 * Run with: `npm run tokens`
 *
 * Style Dictionary v4 is ESM-only and this project is CommonJS, so the
 * library is loaded via dynamic import() inside an async main().
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports -- see note above: CJS config, ESM-only library.
const path = require("node:path");

/** Turn a W3C reference string `{a.b.c}` into `var(--a-b-c)`. */
function refToVar(value) {
  return String(value).replace(
    /\{([^}]+)\}/g,
    (_, ref) => `var(--${ref.split(".").join("-")})`
  );
}

function isReference(value) {
  return typeof value === "string" && value.includes("{");
}

async function main() {
  const { default: StyleDictionary } = await import("style-dictionary");

  StyleDictionary.registerFormat({
    name: "css/rondo-themed",
    format: ({ dictionary }) => {
      const light = [];
      const dark = [];

      dictionary.allTokens.forEach((token) => {
        const name = token.path.join("-");
        const original = token.original.$value;
        const value = isReference(original) ? refToVar(original) : token.$value;
        light.push(`  --${name}: ${value};`);

        const darkRef = token.original.$extensions?.rondo?.dark;
        if (darkRef != null) {
          const darkValue = isReference(darkRef) ? refToVar(darkRef) : darkRef;
          dark.push(`  --${name}: ${darkValue};`);
        }
      });

      return [
        "/**",
        " * Do not edit directly — generated from src/tokens/*.json.",
        " * Run `npm run tokens` to regenerate.",
        " */",
        "",
        ":root {",
        light.join("\n"),
        "}",
        "",
        ".dark {",
        dark.join("\n"),
        "}",
        "",
      ].join("\n");
    },
  });

  const sd = new StyleDictionary({
    source: [path.join(__dirname, "*.json")],
    platforms: {
      css: {
        // Only a name transform (for unique token names / collision
        // detection). No value transforms: keep oklch/rem/etc. exactly as
        // authored and let the custom format handle reference -> var().
        transforms: ["name/kebab"],
        buildPath: path.join(__dirname, "generated") + path.sep,
        files: [
          {
            destination: "tokens.css",
            format: "css/rondo-themed",
          },
        ],
      },
    },
    log: { verbosity: "default" },
  });

  await sd.buildAllPlatforms();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
