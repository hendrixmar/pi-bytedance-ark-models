# AGENTS.md

## Project Overview

This is a Pi extension that adds ByteDance Ark models (Doubao, Seed, DeepSeek) to the Pi coding agent.

## Architecture

- **Single-file extension**: `index.ts` registers the provider with Pi
- **OAuth-style authentication**: API key stored as credentials
- **OpenAI-compatible API**: Uses `openai-completions` API format

## Key Files

- `index.ts` - Main extension entry point, defines models and provider
- `package.json` - Package metadata and Pi configuration
- `README.md` - User documentation

## Model Configuration

Each model in `index.ts` includes:
- `id`: The model identifier used in API calls
- `name`: Display name in Pi
- `reasoning`: Whether the model supports reasoning/thinking
- `input`: Supported input types (`text`, `image`)
- `contextWindow`: Maximum context tokens
- `maxTokens`: Maximum output tokens
- `compat`: OpenAI compatibility settings

## Testing

To test locally:
1. Run `pi install` in this directory
2. Type `/login` in Pi chat
3. Select "ByteDance Ark" provider
4. Enter your API key
5. Select a model and start chatting

## API Endpoint

Base URL: `https://ark.eu-west.bytepluses.com/api/v3`

Region: EU West

## Adding New Models

1. Get model specs from ByteDance Ark console
2. Add to `BYTEDANCE_ARK_MODELS` array in `index.ts`
3. Update README.md model table
4. Test with `/login` and model selection

## Publishing

The package is published via GitHub:
```bash
pi install git:github.com/hendrixmar/pi-bytedance-ark-models
```

To update after changes:
```bash
git add . && git commit -m "Update description"
git push
# Users run: pi update
```
