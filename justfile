default:
    @just --list

# claude with firecrawl mcp
cdfc:
    claude --mcp-config .mcp.json.firecrawl_4k

# everyday claude instance
cdtg:
    claude --model sonnet
