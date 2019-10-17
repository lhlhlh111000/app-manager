import React, { Component } from "react";
import styles from './components.css';
import { AppDO } from '@/pages/net/DTO';

type Props = {
    itemInfo: AppDO,
    hideVersion?: boolean,
}

export default class AppItem extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        let {name, packageName, icon} = this.props.itemInfo;
        let platform = '';
        if(0 == this.props.itemInfo.platform) {
            platform = 'Android';
        }else {
            platform = 'iOS';
        }
        let version = '';
        if(this.props.itemInfo.latestVersion) {
            version = this.props.itemInfo.latestVersion.buildName
        }
        
        return(
            <div className={styles.itemContainer}>
                <div className={styles.itemStyle}>
                    <img className={styles.img} src={icon}/>
                    <br></br>
                    <text className={styles.text}>{name}</text>
                    <br></br>
                    <text className={styles.text2}>{packageName}</text>
                    {this.props.hideVersion ? null : <div>
                        <br></br>
                        <text className={styles.text2}>{'版本：' + version}</text>
                    </div>}
                    <br></br>
                    <text className={styles.text2}>{'平台：' + platform}</text>
                 </div>
            </div>
        );
    }
}