# Pi ByteDance Ark Models

Adds ByteDance Ark **Seed**, **DeepSeek**, **GLM**, and **Kimi** models to Pi via the AP Southeast endpoint.

## Available Models

### Seed Models (Multimodal)
| Model | Context | Max Output | Reasoning |
|------|--------|----------|------|
| Seed 2.0 Pro | 256K | 131K | ❌ |
| Seed 2.0 Lite | 256K | 131K | ❌ |
| Seed 2.0 Mini | 256K | 131K | ❌ |
| Seed 1.8 | 256K | 65K | ❌ |
| Seed 1.6 | 256K | 32K | ❌ |
| Seed 1.6 Flash | 256K | 32K | ❌ |

### DeepSeek Models
| Model | Context | Max Output | Reasoning |
|------|--------|----------|------|
| DeepSeek V3.2 | 128K | 32K | ❌ |
| DeepSeek R1 | 98K | 16K | ✅ |

### GLM Models
| Model | Context | Max Output | Reasoning |
|------|--------|----------|------|
| GLM-4.7 | 200K | 128K | ❌ |

### Kimi Models
| Model | Context | Max Output | Reasoning |
|------|--------|----------|------|
| Kimi K2 Thinking | 256K | 32K | ✅ |

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

This extension uses the **AP Southeast** endpoint: `https://ark.ap-southeast.bytepluses.com/api/v3`

> ⚠️ Note: The EU West endpoint (`ark.eu-west.bytepluses.com`) does not accept this API key. Use AP Southeast only.

## License

MIT
