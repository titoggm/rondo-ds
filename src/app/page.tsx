import { Button } from "@/components/atoms/button"

import styles from "./page.module.css"

const variants = ["primary", "secondary"] as const

const sizes = ["sm", "md", "lg"] as const

export default function ButtonPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Button</h1>
        <p className={styles.description}>
          All variants, sizes, and states of the atom.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Paper replica</h2>
        <div className={`${styles.row} ${styles.stage}`}>
          <Button>Start your project</Button>
          <Button variant="secondary">Request a demo</Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Variants</h2>
        <div className={`${styles.row} ${styles.stage}`}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sizes</h2>
        <div className={`${styles.row} ${styles.stage}`}>
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Disabled</h2>
        <div className={`${styles.row} ${styles.stage}`}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Variant × size</h2>
        <div className={`${styles.matrix} ${styles.stage}`}>
          {variants.map((variant) => (
            <div key={variant} className={styles.row}>
              {sizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {variant}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>As child</h2>
        <div className={`${styles.row} ${styles.stage}`}>
          <Button asChild>
            <a href="#as-child">Rendered as an anchor</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
