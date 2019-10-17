import NetUtil, { NetCallBack } from "./NetUtil";
import { AppDO, VersionDO, RNVersionDO } from './DTO';
import { platform } from 'os';

export default class API {

    /**
     *  获取应用列表
     * @param platform 平台： 0 Android 1 iOS
     * @param callback 回调者
     */
    static appList(platform?: string, callback?: NetCallBack<Array<AppDO>>) {
        NetUtil.get(
            basicAppUrl + '/app-list',
            platform ? {'platform': platform} : null,
            callback
        )
    }

    /**
     * 获取应用信息
     * @param id 应用id
     * @param callback 回调者
     */
    static appInfo(id: number, callback?: NetCallBack<AppDO>) {
        NetUtil.get(
            basicAppUrl + '/app-info',
            {id},
            callback
        )
    }

    /**
     * 获取应用版本列表
     * @param id 应用id
     * @param callback 回调者
     */
    static versionList(id: number, callback?: NetCallBack<Array<VersionDO>>) {
        NetUtil.get(
            basicAppUrl + '/app-version-list',
            {appId: id},
            callback
        )
    }

    /**
     * 删除指定应用版本
     * @param id 版本id
     * @param callback 回调者
     */
    static deleteVersion(id: number, callback?: NetCallBack<void>) {
        NetUtil.get(
            basicAppUrl + '/app-version-delete',
            {versionId: id},
            callback
        )
    }

    /**
     * 改变版本开启状态
     * @param id 版本id
     * @param enable 是否开启
     * @param callback 回调者
     */
    static switchVersion(id: number, enable: boolean, callback?: NetCallBack<void>) {
        NetUtil.get(
            basicAppUrl + '/app-version-switch',
            {versionId: id, isEnable: enable},
            callback
        )
    }

    /**
     * 文件上传
     * @param file 待上传文件
     * @param callback 回调者
     */
    static uploadFile(file: File, callback?: NetCallBack<void>) {
        NetUtil.upload(
            basicAppUrl + '/app-version-upload',
            file,
            callback
        )
    }

    /**
     * 创建版本
     * @param appDO 应用信息
     * @param callback 回调者
     */
    static createVersion(appDO: AppDO, callback?: NetCallBack<VersionDO>) {
        NetUtil.post(
            basicAppUrl + '/app-version-create',
            appDO,
            callback
        )
    }

    /**
     * 根据版本id获取rn版本列表
     * @param versionId 版本id
     * @param callback 回调者
     */
    static rnVersionList(versionId: number, callback?: NetCallBack<Array<RNVersionDO>>) {
        NetUtil.get(
            basicRNUrl + '/rn-version-list',
            {versionId},
            callback
        )
    }

    /**
     * 创建rn版本
     * @param rnVersion rn版本信息
     * @param callback 回调者
     */
    static createRNVersion(rnVersion: RNVersionDO, callback?: NetCallBack<RNVersionDO>) {
        NetUtil.post(
            basicRNUrl + '/create-rn-version',
            rnVersion,
            callback
        )
    }
}

// export const basicUrl: string = 'http://10.0.28.127:8099/version/manager';
export const basicAppUrl: string = '/version/manager';
export const basicRNUrl: string = '/rn/manager';