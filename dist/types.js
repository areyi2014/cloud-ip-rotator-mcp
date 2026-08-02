/**
 * Cloud IP Rotator MCP — Shared Type Definitions
 */
/** Standardized error with provider context */
export class CloudAdapterError extends Error {
    provider;
    cause;
    constructor(provider, message, cause) {
        super(`[${provider}] ${message}`);
        this.provider = provider;
        this.cause = cause;
        this.name = 'CloudAdapterError';
    }
}
//# sourceMappingURL=types.js.map