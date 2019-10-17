import React, { Component } from 'react';
import styles from './AppCreate.css';
import { Tag, Button, Switch } from 'antd';
import { VersionDO } from '../net/DTO';
import router from 'umi/router';

type Props = {
    versionInfo: VersionDO,
    delete: (id: number)=>void
    switch: (id: number, enable: boolean)=>void
}
export default class AppDetailItem extends Component<Props> {

    render() {
        let {updateTips, createTime, size, build, buildName, id, enable} = this.props.versionInfo;
        return(
            <div className={styles.appDetailItem}>
                <span><text className={styles.basicText}>{build + '（' + buildName+ '）'}</text></span>
                <span><text className={styles.basicText3}>{createTime}</text></span>
                <div className={styles.appDetailOperate}>
                    <Button 
                        type="primary" 
                        className={styles.appDetailOperateView}
                        onClick={() => {
                            window.location.href = this.props.versionInfo.url;
                        }}>
                    {size}
                    </Button>
                    <Button 
                        type="primary" icon="delete" 
                        className={styles.appDetailOperateView}
                        onClick={() => {
                            this.props.delete(id);
                        }}>
                    {'删除'}
                    </Button>
                    <Switch 
                        className={styles.appDetailOperateView} 
                        checkedChildren="开" 
                        unCheckedChildren="关" 
                        defaultChecked={enable}
                        onChange={(checked, event) => {
                            this.props.switch(id, checked);
                        }}/>
                </div>
                <span><text className={styles.basicText3}>{updateTips}</text></span>
            </div>
        );
    }
}