/**
 * Rondo DS — Style Dictionary build
 *
 * Compiles the W3C design token JSONs in this folder into CSS custom
 * properties at src/tokens/generated/tokens.css.
 *
 * Every generated custom property is namespaced `--rds-*` (see NAMESPACE).
 *
 * Two-layer token system:
 *   - Primitives (color, font, space, size, ...) emit literal values.
 *   - Semantics (color-surface/action/status, radius, icon-size, font-label/
 *     body/heading, opacity) reference primitives as `{a.b.c}`; the custom
 *     format below rewrites those to `var(--rds-a-b-c)` through refToVar(),
 *     not Style Dictionary's outputReferences, to keep the layering legible.
 *
 * Light mode only. Dark-mode support was removed deliberately; the previous
 * per-token overrides (`$extensions.rondo.dark` -> a `.dark { ... }` block)
 * are recoverable from git history if it is reinstated.
 *
 * Run with: `npm run tokens`
 *
 * Style Dictionary v4 is ESM-only and this project is CommonJS, so the
 * library is loaded via dynamic import() inside an async main().
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports -- see note above: CJS config, ESM-only library.
const path = require("node:path");

/** Namespace prefixed to every generated custom property. */
const NAMESPACE = "rds";

/** Turn a W3C reference string `{a.b.c}` into `var(--rds-a-b-c)`. */
function refToVar(value) {
  return String(value).replace(
    /\{([^{}]+)\}/g,
    (_, ref) => `var(--${NAMESPACE}-${ref.replaceAll(".", "-")})`
  );
}

function isReference(value) {
  return typeof value === "string" && value.includes("{");
}

async function main() {
  const { default: StyleDictionary } = await import("style-dictionary");

  StyleDictionary.registerFormat({
    name: "css/rondo",
    format: ({ dictionary }) => {
      const declarations = dictionary.allTokens.map((token) => {
        const name = [NAMESPACE, ...token.path].join("-");
        const original = token.original.$value;
        const value = isReference(original) ? refToVar(original) : token.$value;
        return `  --${name}: ${value};`;
      });

      return [
        "/**",
        " * Do not edit directly — generated from src/tokens/*.json.",
        " * Run `npm run tokens` to regenerate.",
        " */",
        "",
        ":root {",
        declarations.join("\n"),
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
            format: "css/rondo",
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
