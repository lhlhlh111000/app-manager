import React, { Component } from 'react';
import { Input, Button } from 'antd';
import styles from './AppCreate.css';
import router from 'umi/router';
import { AppDO, VersionDO } from '../net/DTO';
import API from '../net/API';

const { TextArea } = Input;

type Props = {appInfo?: AppDO};
type States = {tips?: any}

export default class AppInfoConfirm extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        this.state = {
            tips: '',
        }
    }

    render() {
        if(this.props.appInfo) {
            let {name, icon, packageName, latestVersion} = this.props.appInfo;
            let {buildName, build} = latestVersion;
            return(
                <div className={styles.infoViewContent}>
                    <div className={styles.infoViewContainer}>
                        <img className={styles.img} src={icon}/>
                        <br></br>
                        <text className={styles.text}>{'应用名：' + name}</text>
                        <br></br>
                        <text className={styles.text2}>{'包名/bundle：' + packageName}</text>
                        <br></br>
                        <text className={styles.text2}>{'版本：' + build}</text>
                        <br></br>
                        <text className={styles.text2}>{'版本号：' + buildName}</text>
                        <br></br>
                        <br></br>
                        <TextArea rows={4}
                            onChange={(e) => {
                                this.setState({
                                    tips: e.target.value,
                                })
                            }}/>
                        <Button 
                            type="primary" 
                            className={styles.sureBtn}
                            onClick={() => {
                                this._createVersion();
                            }}>
                            {'确定'}
                        </Button>
                    </div>
                </div>
            );
        }else {
            return null;
        }
    }

    _createVersion = () => {
        let appDO = this.props.appInfo;
        if(!appDO) {
            return;
        }

        let { latestVersion } = appDO;
        latestVersion.updateTips = this.state.tips||'';
        appDO.latestVersion = latestVersion;
        API.createVersion(
            appDO, {
                success: (data: VersionDO) => {
                    router.push({
                        pathname: '/app/AppDetail',
                        query: {
                            appId: data.appId,
                        }
                    })
                }, 
                fail: (msg: string) => {
                }
            }
        )
    }
}