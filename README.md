# Pi ByteDance Ark Models

Adds ByteDance Ark **Doubao**, **Seed**, and **DeepSeek** models to Pi via the EU West endpoint.

## Available Models

| Model | Context | Max Output | Reasoning |
|------|--------|----------|------|
| Doubao 1.5 Pro 32K | 32K | 4,096 | ❌ |
| Doubao 1.5 Lite 32K | 32K | 4,096 | ❌ |
| Doubao 1.5 Pro 256K | 256K | 4,096 | ❌ |
| Seed 1.6 Flash | 256K | 8,192 | ❌ |
| Seed 1.6 Pro | 256K | 8,192 | ❌ |
| DeepSeek V3 | 64K | 8,192 | ❌ |
| DeepSeek R1 | 64K | 8,192 | ✅ |

## Installation

**From source:**
```bash
pi install git:github.com/hendrixmar/pi-bytedance-ark-models
```

## Update

```bash
pi update
```

## Usage

1. Type `/login` in the chat
2. Select **"ByteDance Ark"** provider
3. Enter your **ByteDance Ark API key**
4. Select the model you want to use

> 💡 Get API key: [ByteDance Ark Console](https://console.bytepluses.com/)

## API Endpoint

This extension uses the EU West endpoint: `https://ark.eu-west.bytepluses.com/api/v3`

## License

MIT
