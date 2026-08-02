/**
 * Multi-Cloud Router — 根据 provider 参数将请求路由到对应适配器
 *
 * 这是统一调度层，MCP 工具调用时传入 provider 字段，
 * 路由器负责实例化并返回正确的适配器实例。
 */
import { CloudAdapterError } from './types.js';
import { AwsAdapter } from './adapters/aws.js';
import { AzureAdapter } from './adapters/azure.js';
import { OciAdapter } from './adapters/oci.js';
import { VultrAdapter } from './adapters/vultr.js';
/** 适配器实例缓存（单例） */
const adapters = {
    aws: new AwsAdapter(),
    azure: new AzureAdapter(),
    oci: new OciAdapter(),
    vultr: new VultrAdapter(),
};
/** 获取适配器实例 */
export function getAdapter(provider) {
    const adapter = adapters[provider];
    if (!adapter) {
        throw new CloudAdapterError(provider, `Unsupported provider: "${provider}". Supported: aws, azure, oci, vultr`);
    }
    return adapter;
}
/** 获取所有支持的 provider 列表 */
export function getSupportedProviders() {
    return Object.keys(adapters);
}
/** 检查 provider 是否支持 */
export function isProviderSupported(provider) {
    return provider in adapters;
}
//# sourceMappingURL=router.js.map