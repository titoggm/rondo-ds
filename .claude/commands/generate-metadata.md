---
description: Generate metadata for the specified components
argument-hint: [list-of-components-to-create-metadata-for]
allowed-tools: Read, Write, Bash
model: sonnet
---

# Generate Component Metadata

Follow the `Workflow` below to launch `COUNT` agents in parallel to accomplish creating metadata for the components in the `LIST_OF_COMPONENTS_TO_CREATE_METADATA_FOR`. Each agent will focus on a different component.

## Variables

LIST_OF_COMPONENTS_TO_CREATE_METADATA_FOR: $1
COUNT

## Workflow

1. Parse Input Parameters
   - Extract `LIST_OF_COMPONENTS_TO_CREATE_METADATA_FOR` to identify which components metadata should be created for.
   - If `LIST_OF_COMPONENTS_TO_CREATE_METADATA_FOR` is empty, STOP immediately and inform the user that at least one component must be provided.
   - Determine COUNT by the number of components in `LIST_OF_COMPONENTS_TO_CREATE_METADATA_FOR`.

2. Design Agent Prompts
   - Create detailed, self-contained prompts for each agent.
   - Include specific instructions on what to accomplish.
   - Define clear output expectations.
   - Remember each agent is stateless and needs complete context.

3. Launch Parallel agents
   - For each component, use the Task tool in parallel and follow the metadata_loop_prompt as the exact prompt for each Task.
     <metadata_loop_prompt>
     Use the @metadata-creator agent and pass it the component as the prompt.
     </metadata_loop_prompt>
   - Ensure all agents launch in a single parallel batch.

4. Collect & Summarize Findings
   - Gather outputs from each @metadata-creator agent to determine what metadata fields still need to be filled in for each component
   - If an agent fails, continue collecting outputs from the remaining agents and record the failure in the final report.
   - Synthesize findings into cohesive responese

# Report

Report the results using the following format:

For each component:

<component-name>
Status: <✅ Success> or <❌ Failure>
Metadata Created: <List the metadata fields that were generated. If none, write "None".>
Fields Requiring Human Input: <List the metadata fields that still need to be completed by the user. If none, write "None".>
Notes: <List any relevant notes, warnings, or issues encountered during metadata creation. If none, write "None".>
