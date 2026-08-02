/**
 * Multi-Cloud Router — 根据 provider 参数将请求路由到对应适配器
 *
 * 这是统一调度层，MCP 工具调用时传入 provider 字段，
 * 路由器负责实例化并返回正确的适配器实例。
 */
import type { CloudAdapter } from './adapters/base.js';
import type { CloudProvider } from './types.js';
/** 获取适配器实例 */
export declare function getAdapter(provider: string): CloudAdapter;
/** 获取所有支持的 provider 列表 */
export declare function getSupportedProviders(): CloudProvider[];
/** 检查 provider 是否支持 */
export declare function isProviderSupported(provider: string): provider is CloudProvider;
