import React, { Component } from "react";
import { VersionDO } from '../../pages/net/DTO';
import { Empty } from 'antd';
import styles from "./RNStyles.css";

type Props = {
    verisonInfo: VersionDO,
}
export default class AppVersionItem extends Component<Props> {

    render() {
        let { build, buildName, latestRNVersion } = this.props.verisonInfo;
        if(latestRNVersion) {
            let { version, size, createTime, desc } = latestRNVersion || {};
            return (
                <div className={styles.appDetailItem}>
                    <div className={styles.headVersion}> 
                        <text>{build + '(' + buildName + ')'}</text>
                    </div>
                    <div className={styles.latestVersion}> 
                        <text>{'版本：' + version}</text>
                        <text>{'大小：' + size}</text>
                        <text>{'时间：' + createTime}</text> 
                        <text>{'备注：' + desc}</text>
                    </div>
                </div>
            );
        }else {
            return(
                <div className={styles.appDetailItem}>
                    <div className={styles.headVersion}> 
                        <text>{build + '(' + buildName + ')'}</text>
                    </div>
                    <div className={styles.latestVersion}>
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={'暂无最新版本信息'} />
                    </div>
                </div>
            )
        }
    }
}