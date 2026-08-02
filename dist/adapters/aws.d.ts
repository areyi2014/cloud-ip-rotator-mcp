/**
 * AWS Adapter — 通过 AWS SDK v3 实现 EC2 实例公网 IP 轮换
 *
 * 轮换方式：停止 → 启动 EC2 实例，AWS 会回收旧的动态公网 IP 并分配新的。
 * 这是旧项目中验证过的方案，适用于非 Elastic IP 的动态公网 IP 场景。
 *
 * 凭据通过参数传入，不持久化。
 */
import type { CloudAdapter } from './base.js';
import type { CloudProvider, Credentials, RotateIpResult, InstanceInfo, AllocatedIp } from '../types.js';
export declare class AwsAdapter implements CloudAdapter {
    readonly provider: CloudProvider;
    /** 从凭据 map 中提取 AWS 认证参数 */
    private parseCreds;
    /** 创建 EC2 客户端 */
    private createClient;
    rotateIp(instanceId: string, region: string, credentials: Credentials): Promise<RotateIpResult>;
    getInstancePublicIp(instanceId: string, region: string, credentials: Credentials): Promise<string | null>;
    getInstanceInfo(instanceId: string, region: string, credentials: Credentials): Promise<InstanceInfo>;
    listInstances(region: string, credentials: Credentials): Promise<InstanceInfo[]>;
    allocateIp(region: string, credentials: Credentials): Promise<AllocatedIp>;
    associateIp(instanceId: string, allocationId: string, region: string, credentials: Credentials): Promise<void>;
    releaseIp(allocationId: string, region: string, credentials: Credentials): Promise<void>;
    listIps(region: string, credentials: Credentials): Promise<AllocatedIp[]>;
}
