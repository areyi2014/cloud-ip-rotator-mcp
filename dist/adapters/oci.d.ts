/**
 * Oracle OCI Adapter — 通过 OCI REST API 实现公网 IP 轮换
 *
 * 轮换方式：
 *   1. 查找实例的 VNIC
 *   2. 获取 Private IP ID
 *   3. 尝试创建 ephemeral 公网 IP
 *   4. 如果冲突（已有公网 IP），从错误中提取已有 IP OCID 并删除
 *   5. 重试创建新 ephemeral 公网 IP
 *
 * OCI 使用 API Key 认证，需要对请求进行 RSA-SHA256 签名。
 */
import type { CloudAdapter } from './base.js';
import type { CloudProvider, Credentials, RotateIpResult, InstanceInfo, AllocatedIp } from '../types.js';
export declare class OciAdapter implements CloudAdapter {
    readonly provider: CloudProvider;
    /** 从凭据 map 中提取 OCI 认证参数 */
    private parseCreds;
    /** OCI API 版本 */
    private readonly apiVersion;
    rotateIp(instanceId: string, region: string, credentials: Credentials): Promise<RotateIpResult>;
    getInstancePublicIp(instanceId: string, region: string, credentials: Credentials): Promise<string | null>;
    getInstanceInfo(instanceId: string, region: string, credentials: Credentials): Promise<InstanceInfo>;
    listInstances(region: string, credentials: Credentials): Promise<InstanceInfo[]>;
    allocateIp(region: string, credentials: Credentials): Promise<AllocatedIp>;
    associateIp(instanceId: string, allocationId: string, region: string, credentials: Credentials): Promise<void>;
    releaseIp(allocationId: string, region: string, credentials: Credentials): Promise<void>;
    listIps(region: string, credentials: Credentials): Promise<AllocatedIp[]>;
    /** 获取实例信息 */
    private getInstance;
    /** 获取实例的 VNIC */
    private getInstanceVnic;
    /** 获取 VNIC 的公网 IP */
    private getVnicPublicIp;
    /** 获取 VNIC 的 Private IP ID */
    private getPrivateIpId;
    /** 创建 ephemeral 公网 IP */
    private createEphemeralPublicIp;
    /** 删除公网 IP */
    private deletePublicIp;
    /**
     * OCI API 请求 — 包含 API Key 签名
     *
     * 签名格式：
     *   Authorization: Signature keyId="ocid1.user.oc1.../ocid1.tenancy.oc1.../fingerprint",
     *                  algorithm="rsa-sha256",
     *                  headers="date (request-target) host content-type content-length",
     *                  signature="base64(...)"
     */
    private ociRequest;
    /** 使用 RSA-SHA256 签名 */
    private sign;
}
