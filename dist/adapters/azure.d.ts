/**
 * Azure Adapter — 通过 Azure SDK 实现 VM 公网 IP 轮换
 *
 * 轮换方式：
 *   1. 查找 VM 的 NIC
 *   2. 解绑旧 Public IP
 *   3. 删除旧 Public IP
 *   4. 创建新 Standard Static Public IP
 *   5. 绑定新 IP 到 NIC
 *
 * 凭据通过参数传入，不持久化。
 */
import type { CloudAdapter } from './base.js';
import type { CloudProvider, Credentials, RotateIpResult, InstanceInfo, AllocatedIp } from '../types.js';
export declare class AzureAdapter implements CloudAdapter {
    readonly provider: CloudProvider;
    /** 从凭据 map 中提取 Azure 认证参数 */
    private parseCreds;
    /** 创建 Azure 认证凭据 */
    private createCredential;
    /** 创建 Network 管理客户端 */
    private createNetworkClient;
    /** 创建 Compute 管理客户端 */
    private createComputeClient;
    rotateIp(instanceId: string, region: string, credentials: Credentials): Promise<RotateIpResult>;
    getInstancePublicIp(instanceId: string, region: string, credentials: Credentials): Promise<string | null>;
    getInstanceInfo(instanceId: string, region: string, credentials: Credentials): Promise<InstanceInfo>;
    listInstances(region: string, credentials: Credentials): Promise<InstanceInfo[]>;
    allocateIp(region: string, credentials: Credentials): Promise<AllocatedIp>;
    associateIp(instanceId: string, allocationId: string, region: string, credentials: Credentials): Promise<void>;
    releaseIp(allocationId: string, region: string, credentials: Credentials): Promise<void>;
    listIps(region: string, credentials: Credentials): Promise<AllocatedIp[]>;
}
