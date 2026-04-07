import type { OAuthCredentials } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const TEN_YEARS_MS = 10 * 365 * 24 * 60 * 60 * 1000;

const BYTEDANCE_ARK_MODELS = [
	// Ark Code Model
	{
		id: "byteplus-plan/ark-code-latest",
		name: "Ark Code Latest",
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
	// ByteDance Seed Code Model
	{
		id: "byteplus-plan/bytedance-seed-code",
		name: "ByteDance Seed Code",
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
		id: "byteplus-plan/glm-4.7",
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
	// Kimi Model
	{
		id: "byteplus-plan/kimi-k2.5",
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
