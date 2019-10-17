import React, { Component } from 'react';
import styles from './AppCreate.css';
import { Button } from 'antd';
import router from 'umi/router';
import { AppDO } from '../net/DTO';

type Props = {
    appInfo?: AppDO
}

export default class AppBasicInfo extends Component<Props> {

    render() {
        if(this.props.appInfo) {
            let {name, packageName, icon, token} = this.props.appInfo;
            let platfrom = '';
            if(1 == this.props.appInfo.platform) {
                platfrom = 'iOS';
            }else {
                platfrom = 'Android';
            }
            return (
                <div className={styles.basic}>
                    <img className={styles.basicInfoIcon} src={icon}/>
                    <div className={styles.basicInfo}>
                        <text className={styles.basicText}>{name}</text>
                        <br></br>
                        <text className={styles.basicText2}>{packageName}</text>
                        <br></br>
                        <text className={styles.basicText2}>{'平台：' + platfrom}</text>
                        <br></br>
                        <text className={styles.basicText2}>{'Token：' + token}</text>
                    </div>
                    <Button 
                        type='primary' 
                        className={styles.basicInfoNew}
                        onClick={() => {
                            router.push('/app/AppCreate');
                        }}>
                        {'上传新版'}
                    </Button>
                </div>
            );
        }else {
            return null;
        }
    }
}