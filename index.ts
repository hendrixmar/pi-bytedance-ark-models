import type { OAuthCredentials } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const TEN_YEARS_MS = 10 * 365 * 24 * 60 * 60 * 1000;

const BYTEDANCE_ARK_MODELS = [
	{
		id: "doubao-1.5-pro-32k-250115",
		name: "Doubao 1.5 Pro 32K",
		reasoning: false,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 32_768,
		maxTokens: 4_096,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	{
		id: "doubao-1.5-lite-32k-250115",
		name: "Doubao 1.5 Lite 32K",
		reasoning: false,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 32_768,
		maxTokens: 4_096,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	{
		id: "doubao-1.5-pro-256k-250115",
		name: "Doubao 1.5 Pro 256K",
		reasoning: false,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 4_096,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	{
		id: "seed-1.6-flash-250615",
		name: "Seed 1.6 Flash",
		reasoning: false,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 256_000,
		maxTokens: 8_192,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	{
		id: "seed-1.6-pro-250615",
		name: "Seed 1.6 Pro",
		reasoning: false,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 256_000,
		maxTokens: 8_192,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	{
		id: "deepseek-v3-250324",
		name: "DeepSeek V3",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 64_000,
		maxTokens: 8_192,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	{
		id: "deepseek-r1-250120",
		name: "DeepSeek R1",
		reasoning: true,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 64_000,
		maxTokens: 8_192,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "deepseek"
		}
	},
];

function createApiKeyCredentials(apiKey: string): Promise<OAuthCredentials> {
	return {
		access: apiKey,
		refresh: apiKey,
		expires: Date.now() + TEN_YEARS_MS,
	};
}

export default function registerByteDanceArkProvider(pi: ExtensionAPI): void {
	pi.registerProvider("ByteDance Ark", {
		baseUrl: "https://ark.eu-west.bytepluses.com/api/v3",
		api: "openai-completions",
		models: BYTEDANCE_ARK_MODELS,
		oauth: {
			name: "ByteDance Ark",

			async login(callbacks): Promise<OAuthCredentials> {
				const apiKey = await callbacks.onPrompt({
					message: "Enter your ByteDance Ark API key:",
					placeholder: "Enter API key...",
				});

				const trimmed = apiKey.trim();
				if (trimmed.length === 0) {
					throw new Error("API key is required.");
				}

				return createApiKeyCredentials(trimmed);
			},

			async refreshToken(credentials) {
				return credentials;
			},

			getApiKey(credentials) {
				return credentials.access;
			},
		},
	});
}
