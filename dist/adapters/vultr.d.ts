/**
 * Vultr Adapter — 通过 Vultr REST API v2 实现公网 IP 轮换
 *
 * 轮换方式：
 *   1. 创建新的 Reserved IP
 *   2. 绑定到实例
 *   3. 获取新 IP
 *   4. 删除旧的 Reserved IP（如果有）
 *
 * 凭据通过参数传入，不持久化。
 */
import type { CloudAdapter } from './base.js';
import type { CloudProvider, Credentials, RotateIpResult, InstanceInfo, AllocatedIp } from '../types.js';
export declare class VultrAdapter implements CloudAdapter {
    readonly provider: CloudProvider;
    private readonly baseUrl;
    /** 从凭据 map 中提取 Vultr API Key */
    private parseCreds;
    /** 发送 Vultr API 请求 */
    private vultrRequest;
    rotateIp(instanceId: string, region: string, credentials: Credentials): Promise<RotateIpResult>;
    getInstancePublicIp(instanceId: string, region: string, credentials: Credentials): Promise<string | null>;
    getInstanceInfo(instanceId: string, region: string, credentials: Credentials): Promise<InstanceInfo>;
    listInstances(region: string, credentials: Credentials): Promise<InstanceInfo[]>;
    allocateIp(region: string, credentials: Credentials): Promise<AllocatedIp>;
    associateIp(instanceId: string, allocationId: string, region: string, credentials: Credentials): Promise<void>;
    releaseIp(allocationId: string, region: string, credentials: Credentials): Promise<void>;
    listIps(region: string, credentials: Credentials): Promise<AllocatedIp[]>;
    /** 获取实例关联的 Reserved IP ID 列表 */
    private getInstanceReservedIps;
}
