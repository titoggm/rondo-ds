# Thread Types — Thread-Based Engineering

A **thread** is a unit of engineering work over time, driven by you and your agent. You show up at two nodes — the beginning (prompt/plan) and the end (review/validate). The middle is the agent executing tool calls. Core insight: tool calls roughly equal impact, so the goal is to increase tool calls per unit of your attention.

---

## Base Thread

**Shape:** `PROMPT → TOOL CALLS → REVIEW`

The atomic unit of agentic coding. Every prompt you run follows this shape. You prompt, the agent executes (file reads, code writes, test runs, commands), you review.

**Use it for:** everything by default. Any single task that fits in one agent's context and doesn't need mid-flight verification. If you're asking "do I really need to break this down?" and the answer is no — run a base thread.

---

## P-Thread (Parallel)

**Shape:** many base threads running side by side.

Scales **horizontally**. Boris Cherny (creator of Claude Code) runs ~15: five in the terminal, five to ten in the browser.

- **In-loop (terminal):** active collaboration where you guide and redirect.
- **Out-of-loop (web/cloud):** fire-and-forget tasks that finish while you work elsewhere.

**Use it for:**

- Code review at scale
- Rapid exploration of multiple solutions
- Verification through redundancy
- Running unrelated workstreams concurrently (one writes tests, one refactors, one explores)

---

## C-Thread (Checkpoint)

**Shape:** work deliberately chained into phases with verification between them.

Intentional chunking is a feature, not a bug. A C-thread is _you choosing_ to break work up — not the agent crashing mid-task (that's just a bug).

**Reach for it when:**

1. **Context constraints** — the work exceeds a single agent's context window.
2. **Production stakes** — high-risk work where human verification at each phase prevents catastrophe.

**Supporting tools:** `AskUserQuestion` for explicit approval, system notifications for passive awareness, text-to-speech hooks for hands-free phase updates.

**Trade-off:** costs your time and energy. Don't reach for it reflexively.

---

## F-Thread (Fusion)

**Shape:** P-thread + aggregation. Parallelize, then merge/choose the best.

Nine agents, one winner — e.g. 3 Claude Code + 3 Gemini + 3 Codex all on the same problem. Evaluate all nine, pick the winner. If four of five agents agree, you can trust that answer; the probability math works in your favor.

**Use it for:**

- Rapid prototyping and experimentation at speed
- Best-of-N when you need confidence
- Cherry-picking and combining the best ideas across agents
- Any answer where a single agent's word isn't enough

**Safety:** agent sandboxes give complete isolation — no shared state, no cross-contamination. This is **deferred trust**: zero risk until you choose to pull down a result.

---

## B-Thread (Big / Branch)

**Shape:** agents managing agents. Prompts firing off other prompts.

Scales **vertically (depth)** where P-threads scale width. Simplest form: one agent spawns a sub-agent. Full form: an orchestrator agent managing a team — plan agent, scout agent, build agent, review agents, deploy agent. From your seat: one prompt in, one review out; everything between is an engineered black box.

**Use it for:**

- Meta-agentics / meta-prompts (prompts that generate prompts)
- AI Developer Workflows
- Deterministic code orchestrating non-deterministic intelligence — a loop over an agent (the "Ralph Wiggum pattern")
- Repeatable pipelines you want to just work, again and again

This is where you stop being a coder and become an architect of autonomous systems.

---

## L-Thread (Long-Running)

**Shape:** identical to the base thread — just stretched across time. 26 hours instead of 26 minutes.

Kick off a prompt, go to bed, come back a day later to review. 100x duration means 100x the decisions the agent makes without you — thousands of autonomous tool calls.

**Prerequisites — the core four must all be exceptional:**

- **Context:** the right information, no more and no less, to stay on track for hours
- **Model:** capable of sustained reasoning and decision-making across large tasks
- **Prompt:** crystal-clear agentic prompt engineering — great planning is great prompting
- **Tools:** if your agents don't have the tools _you_ would use, they can't do the job

**Use it for:** large autonomous builds that run while you sleep.

---

## Z-Thread (Zero-Touch)

**Shape:** `PROMPT → TOOL CALLS`. No review node. You prompt, the agent works, the work ships.

**Not vibe coding.** Vibe coding is trusting blindly. The Z-thread is _maximum earned trust_: battle-tested tools, refined prompts, engineered context, agents that verify their own work. "It isn't that we don't look at the code. It's that we know we don't have to."

**Use it for:** the destination, not the starting point — systems that have proven themselves over hundreds of iterations.

---

## Four Ways to Scale Your Output

| Lever                             | Thread     | What it buys you                                     |
| --------------------------------- | ---------- | ---------------------------------------------------- |
| **Width** (more threads)          | P-thread   | ~5x exploration per hour                             |
| **Time** (longer threads)         | L-thread   | 10 minutes of prompting → 8 hours of autonomous work |
| **Depth** (thicker threads)       | B-thread   | One prompt fires off entire teams of agents          |
| **Attention** (fewer checkpoints) | → Z-thread | Not more compute — earned trust                      |

**Common denominator:** increase tool calls per unit of your attention. Stack the multipliers, track them weekly, watch them trend upward.

**Foundation:** context, model, prompt, tools. Invest here and your threads grow naturally.
