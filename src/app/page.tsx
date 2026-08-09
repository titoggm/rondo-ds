"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/atoms/avatar"
import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { Checkbox } from "@/components/atoms/checkbox"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Separator } from "@/components/atoms/separator"
import { Skeleton } from "@/components/atoms/skeleton"
import { Textarea } from "@/components/atoms/textarea"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card"

import styles from "./page.module.css"

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const buttonSizes = ["xs", "sm", "default", "lg"] as const
const badgeVariants = [
  "default",
  "secondary",
  "outline",
  "destructive",
  "ghost",
  "link",
] as const

export default function Home() {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Rondo Atoms</h1>
          <p className={styles.subtitle}>
            All 9 atom components, rendered from semantic tokens.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? "Light mode" : "Dark mode"}
        </Button>
      </header>

      {/* Button */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Button</h2>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Variants</span>
          <div className={styles.row}>
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Sizes</span>
          <div className={styles.row}>
            {buttonSizes.map((size) => (
              <Button key={size} size={size}>
                {size}
              </Button>
            ))}
            <Button size="icon" aria-label="Confirm">
              <HugeiconsIcon icon={Tick02Icon} />
            </Button>
          </div>
        </div>
        <div className={styles.group}>
          <span className={styles.groupLabel}>States</span>
          <div className={styles.row}>
            <Button>
              <HugeiconsIcon icon={Tick02Icon} data-icon="inline-start" />
              With icon
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </section>

      {/* Badge */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Badge</h2>
        <div className={styles.row}>
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </section>

      {/* Input & Textarea */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Input &amp; Textarea</h2>
        <div className={styles.row}>
          <div className={styles.field}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className={styles.field}>
            <Label htmlFor="disabled-input">Disabled</Label>
            <Input id="disabled-input" placeholder="Disabled" disabled />
          </div>
        </div>
        <div className={styles.field}>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself…" rows={3} />
        </div>
      </section>

      {/* Checkbox & Label */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Checkbox &amp; Label</h2>
        <div className={styles.stack}>
          <Label className={styles.formRow}>
            <Checkbox defaultChecked />
            Accept terms and conditions
          </Label>
          <Label className={styles.formRow}>
            <Checkbox />
            Subscribe to the newsletter
          </Label>
          <Label className={styles.formRow}>
            <Checkbox disabled />
            Disabled option
          </Label>
        </div>
      </section>

      {/* Avatar */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Avatar</h2>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Sizes</span>
          <div className={styles.row}>
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Image, fallback &amp; badge</span>
          <div className={styles.row}>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="User" />
              <AvatarFallback>RG</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>TG</AvatarFallback>
              <AvatarBadge>
                <HugeiconsIcon icon={Tick02Icon} />
              </AvatarBadge>
            </Avatar>
          </div>
        </div>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Group</span>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>

      {/* Separator */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Separator</h2>
        <div className={styles.stack}>
          <span>Above</span>
          <Separator />
          <span>Below</span>
        </div>
        <div className={styles.vRow}>
          <span>Home</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      </section>

      {/* Skeleton */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skeleton</h2>
        <div className={styles.skeletonCard}>
          <Skeleton
            style={{
              width: "var(--spacing-10)",
              height: "var(--spacing-10)",
              borderRadius: "var(--radius-full)",
            }}
          />
          <div className={styles.skeletonLines}>
            <Skeleton style={{ height: "var(--spacing-4)", width: "100%" }} />
            <Skeleton style={{ height: "var(--spacing-4)", width: "60%" }} />
          </div>
        </div>
      </section>

      <div className={styles.divider}>
        <h2 className={styles.title}>Rondo Molecules</h2>
        <p className={styles.subtitle}>
          Composed from atoms and semantic tokens.
        </p>
      </div>

      {/* Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Card</h2>
        <div className={styles.cardGrid}>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Default card</CardTitle>
              <CardDescription>
                Header, content and footer slots.
              </CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="Confirm">
                  <HugeiconsIcon icon={Tick02Icon} />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              Spacing, color and radius all come from semantic tokens via the
              card&rsquo;s CSS module.
            </CardContent>
            <CardFooter className="border-t">
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Small card</CardTitle>
              <CardDescription>
                <code>size=&quot;sm&quot;</code> tightens the spacing scale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              The <code>--card-spacing</code> custom property drops to the
              smaller step.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Log in to your account</CardTitle>
              <CardDescription>
                Enter your email and password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.stack}>
                <div className={styles.loginField}>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    className={styles.loginInput}
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className={styles.loginField}>
                  <div className={styles.labelRow}>
                    <Label htmlFor="login-password">Password</Label>
                    <Button
                      className={styles.forgotLink}
                      variant="link"
                      size="sm"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    className={styles.loginInput}
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <Label className={styles.formRow}>
                  <Checkbox defaultChecked />
                  Remember me
                </Label>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className={styles.cardFooterHighlight}>
              <Button className={styles.loginButton} size="lg">
                Log in
              </Button>
            </CardFooter>
          </Card>

          <Card>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.cardImage}
              src="https://picsum.photos/seed/meetup/600/300"
              alt="Design systems meetup"
            />
            <CardHeader>
              <CardTitle>Design Systems Meetup</CardTitle>
              <CardDescription>
                A leading image bleeds to the card&rsquo;s rounded top corners.
              </CardDescription>
              <CardAction>
                <Badge>Featured</Badge>
              </CardAction>
            </CardHeader>
            <Separator />
            <CardFooter className={styles.cardFooterHighlight}>
              <Button className={styles.cardCta} size="lg">
                View event
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
