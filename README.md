# Pi ByteDance Ark Models

Adds ByteDance Ark **Ark Code**, **Seed Code**, **GLM**, and **Kimi** models to Pi via the byteplus-plan endpoint.

## Available Models

| Model | Context | Max Output | Reasoning |
|------|--------|----------|------|
| Ark Code Latest | 256K | 128K | ❌ |
| ByteDance Seed Code | 256K | 128K | ❌ |
| GLM-4.7 | 200K | 128K | ❌ |
| Kimi K2.5 | 256K | 64K | ❌ |

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

> ⚠️ **Important**: Models must be activated in the Ark Console before use. Visit the console and enable the models you want to use.

## API Endpoint

This extension uses the **AP Southeast Coding** endpoint: `https://ark.ap-southeast.bytepluses.com/api/coding/v3`

> ⚠️ Note: The EU West endpoint (`ark.eu-west.bytepluses.com`) and standard AP Southeast endpoint do not accept this API key. Use the coding endpoint only.

## License

MIT
