import type { OAuthCredentials } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const TEN_YEARS_MS = 10 * 365 * 24 * 60 * 60 * 1000;

const BYTEDANCE_ARK_MODELS = [
	// Doubao Seed Models
	{
		id: "doubao-seed-2.0-code",
		name: "Doubao Seed 2.0 Code",
		reasoning: false,
		input: ["text"] as const,
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
		id: "doubao-seed-2.0-pro",
		name: "Doubao Seed 2.0 Pro",
		reasoning: false,
		input: ["text", "image"] as const,
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
		id: "doubao-seed-2.0-lite",
		name: "Doubao Seed 2.0 Lite",
		reasoning: false,
		input: ["text", "image"] as const,
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
		id: "doubao-seed-code",
		name: "Doubao Seed Code",
		reasoning: false,
		input: ["text"] as const,
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
	// MiniMax Model
	{
		id: "minimax-m2.5",
		name: "MiniMax M2.5",
		reasoning: false,
		input: ["text"] as const,
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
	// GLM Model
	{
		id: "glm-4.7",
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
	// DeepSeek Model
	{
		id: "deepseek-v3.2",
		name: "DeepSeek V3.2",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 131_072,
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
	// Kimi Model
	{
		id: "kimi-k2.5",
		name: "Kimi K2.5",
		reasoning: false,
		input: ["text"] as const,
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
