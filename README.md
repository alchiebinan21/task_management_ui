# Task Management UI

Nuxt 3 frontend for the Task Management + AI demo stack. Includes task CRUD, natural-language task chat (MCP), PDF document AI (RAG), and live context-switching chatbot demo.

## Related repositories

| Repo | Purpose |
|------|---------|
| [task_management_ui](https://github.com/alchiebinan21/task_management_ui) | This Nuxt app |
| [task_management_app](https://github.com/alchiebinan21/task_management_app) | Laravel API (tasks + MCP routes) |
| [task_management_agent](https://github.com/alchiebinan21/task_management_agent) | Task Agent (FastAPI: chat, RAG, context demo) |
| [task_management_mcp](https://github.com/alchiebinan21/task_management_mcp) | MCP server (spawned by Task Agent via stdio) |

## Architecture

```
Browser (Nuxt UI :3000)
  ├─ Tasks CRUD ──────────────► Laravel API (:8000 or .test)
  ├─ Task chat / RAG / Context ► Nuxt proxy /api/task/* /api/rag/*
  │                                 └─► Task Agent (:8001)
  │                                       └─► MCP Server (stdio) ─► Laravel MCP API
  └─ Document AI (PDF upload) ──► same proxy ─► Task Agent RAG
```

## Prerequisites

- **Node.js** 18+ and npm
- **PHP** 8.2+, **Composer**, **MySQL** (or SQLite if you adjust Laravel `.env`)
- **Python** 3.10+
- An **LLM API key** (Groq or Gemini free tier, or OpenAI)

## Run on localhost

You need **three services** running. Use **three terminal tabs**.

### 1. Laravel API (tasks database)

```bash
git clone git@github.com:alchiebinan21/task_management_app.git
cd task_management_app

composer install
cp .env.example .env
php artisan key:generate
# Set DB_* in .env, then:
php artisan migrate

php artisan serve
# API at http://127.0.0.1:8000
```

Copy `MCP_API_KEY` from Laravel `.env` — you will need the same value in Task Agent.

> **Laravel Herd / Valet:** If you use a `.test` domain instead, set `NUXT_PUBLIC_API_BASE` in the UI `.env` to match (e.g. `https://task_management_app.test/api`).

### 2. MCP Server + Task Agent (AI backend)

```bash
# MCP Server (clone once; Task Agent starts it automatically)
git clone git@github.com:alchiebinan21/task_management_mcp.git
cd task_management_mcp
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Set MCP_API_KEY and API_BASE_URL to your Laravel MCP endpoint

# Task Agent
git clone git@github.com:alchiebinan21/task_management_agent.git
cd task_management_agent
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit **Task Agent** `.env`:

```bash
# Point to your cloned MCP server (use absolute paths)
MCP_SERVER_COMMAND=/path/to/task_management_mcp/.venv/bin/python
MCP_SERVER_ARGS=/path/to/task_management_mcp/server.py

# Same Laravel MCP URL and key as task_management_app/.env
API_BASE_URL=http://127.0.0.1:8000/api/mcp
MCP_API_KEY=your-mcp-api-key

# LLM (pick one provider)
LLM_PROVIDER=groq
GROQ_API_KEY=your-groq-api-key

API_SERVER_HOST=127.0.0.1
API_SERVER_PORT=8001
```

Start Task Agent:

```bash
source .venv/bin/activate
python api_server.py
# API at http://127.0.0.1:8001
```

Verify: `curl http://127.0.0.1:8001/health` → `{"status":"healthy"}`

### 3. Nuxt UI (this repo)

```bash
git clone git@github.com:alchiebinan21/task_management_ui.git
cd task_management_ui

npm install
cp .env.example .env
```

Edit **`.env`**:

```bash
# Must match your running Laravel URL
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
```

Start dev server:

```bash
npm run dev
```

Open **http://localhost:3000**

## App pages

| Page | URL | What it does |
|------|-----|----------------|
| Home | `/` | Overview + task agent chat |
| Tasks | `/tasks` | Task list CRUD (Laravel API) |
| Document AI | `/document-ai` | Upload PDF, ask questions (RAG) |
| Context Demo | `/context-demo` | Live context switching + color tool |
| Stack | `/stack` | Tech stack overview |
| About | `/about` | Project info |

## Assignment demos

### Document AI (RAG)

1. Go to **Document AI**
2. Upload a PDF
3. Ask questions in the chat box (e.g. *summarize*, *tell me about…*)

Requires Task Agent running with a valid `GROQ_API_KEY` (or other `LLM_PROVIDER`).

### Live context switching

1. Go to **Context Demo**
2. Click **Run color tool** → should return **Red** (favorite color context)
3. Click **Food context** to switch live context
4. Run the tool again → should return **Green**
5. Chat history stays in the same session

## Environment variables (UI)

The Nuxt UI does **not** use `MCP_API_KEY` directly. It is configured in the backend repos.

### MCP API key (task chat via MCP)

Use the **same** `MCP_API_KEY` in all three places:

| Repo | File | Variable |
|------|------|----------|
| task_management_app | `.env` | `MCP_API_KEY` — **set this first** (generate a random string) |
| task_management_mcp | `.env` | `MCP_API_KEY` — copy from Laravel |
| task_management_agent | `.env` | `MCP_API_KEY` — copy from Laravel |

Example (generate once, then paste into all three `.env` files):

```bash
php -r "echo bin2hex(random_bytes(32));"
```

Also ensure `API_BASE_URL` in Task Agent and MCP server points to your Laravel MCP endpoint (e.g. `http://127.0.0.1:8000/api/mcp`).

### UI variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_PUBLIC_API_BASE` | — | Laravel API base URL (required) |
| `NUXT_TASK_AGENT_URL` | `http://127.0.0.1:8001` | Task Agent URL for server proxy |
| `NUXT_PUBLIC_TASK_BASE_URL` | `/api/task` | Same-origin proxy path for agent |
| `NUXT_PUBLIC_RAG_BASE_URL` | `/api/rag` | Same-origin proxy path for RAG |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Tasks page empty / 404 | Check Laravel is running and `NUXT_PUBLIC_API_BASE` is correct |
| Chat returns error | Start Task Agent on port 8001; check LLM API key in agent `.env` |
| `POST /api/rag/upload` 500 | Restart Task Agent after pulling latest agent code |
| Port 8001 already in use | `lsof -i :8001` then kill the old process and restart agent |
| MCP / task chat fails | Ensure `MCP_API_KEY` matches in Laravel and Task Agent `.env` |
| CORS issues | UI proxies through `/api/task` and `/api/rag` — avoid calling `:8001` from the browser directly |

## Production build

```bash
npm run build
npm run preview
```

Set `NUXT_TASK_AGENT_URL` and `NUXT_PUBLIC_API_BASE` to your deployed backend URLs.

## License

MIT (or your project license)
