// 应用实体信息
export interface AppDO {
    id: number,
    platform: number, // 平台 0 android 1 iOS
    packageName: string,
    name: string,
    desc: string,
    icon: string, 
    token: string, // 应用token信息
    createTime: string,
    latestVersion: VersionDO,
}

// 版本实体信息
export interface VersionDO {
    id: number,
    appId: number, // 关联应用id
    build: number, // 版本号
    buildName: string, //版本名
    url: string, // 下载地址
    size: string, // 文件大小
    updateTips: string, // 更新提示
    force: boolean, // 是否强制更新
    enable: boolean, // 是否启用
    createTime: string,
    latestRNVersion: RNVersionDO, 
}

// RN 版本实体
export interface RNVersionDO {
    id: number,
    versionId: number, // 关联版本
    version: number, // bundle 版本号
    url: string, // 下载地址
    sha1: string, // bundle sha1值
    type: number, // 0 全量 1 增量
    enable: boolean, // 是否可用
    size: string, // 文件大小
    desc: string, // 描述
    createTime: string, // 创建时间
}