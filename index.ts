import type { OAuthCredentials } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const TEN_YEARS_MS = 10 * 365 * 24 * 60 * 60 * 1000;

const BYTEDANCE_ARK_MODELS = [
	// Seed Models (VLM - Vision Language Models)
	{
		id: "seed-2-0-pro-260328",
		name: "Seed 2.0 Pro",
		reasoning: false,
		input: ["text", "image", "video"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 131_072,
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
		id: "seed-2-0-lite-260228",
		name: "Seed 2.0 Lite",
		reasoning: false,
		input: ["text", "image", "video"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 131_072,
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
		id: "seed-2-0-mini-260215",
		name: "Seed 2.0 Mini",
		reasoning: false,
		input: ["text", "image", "video"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 131_072,
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
		id: "seed-1-8-251228",
		name: "Seed 1.8",
		reasoning: false,
		input: ["text", "image", "video"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 65_536,
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
		id: "seed-1-6-250915",
		name: "Seed 1.6",
		reasoning: false,
		input: ["text", "image", "video"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 32_768,
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
		id: "seed-1-6-flash-250715",
		name: "Seed 1.6 Flash",
		reasoning: false,
		input: ["text", "image", "video"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 32_768,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	// DeepSeek Models
	{
		id: "deepseek-v3-2-251201",
		name: "DeepSeek V3.2",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 131_072,
		maxTokens: 32_768,
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
		contextWindow: 98_304,
		maxTokens: 16_384,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "deepseek"
		}
	},
	// GLM Models
	{
		id: "glm-4-7-251222",
		name: "GLM-4.7",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 204_800,
		maxTokens: 131_072,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
		}
	},
	// Kimi Models
	{
		id: "kimi-k2-thinking-251104",
		name: "Kimi K2 Thinking",
		reasoning: true,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 32_768,
		compat: {
			supportsDeveloperRole: true,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: false,
			requiresMistralToolIds: false,
			thinkingFormat: "standard"
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
		baseUrl: "https://ark.ap-southeast.bytepluses.com/api/coding/v3",
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
