import React, { Component } from 'react';
import { RNVersionDO } from '../net/DTO';
import { Input, Button, message } from 'antd';
import styles from './RNStyles.css';
import { version } from 'moment';
import API from '../net/API';
import router from 'umi/router';

const { TextArea } = Input;

type Props = {
    rnInfo?: RNVersionDO,
    versionId?: number,
}
type States = {
    version?: string,
    updateInfo?: string,
}
export default class RNInfoConfirm extends Component<Props, States> {

    render() {
        if(this.props.rnInfo) {
            let {sha1} = this.props.rnInfo;
            return(
                    <div className={styles.infoViewContent}>
                        <div className={styles.infoViewContainer}>
                            <text className={styles.text}>{'SHA1值：' + sha1}</text>
                            <div style={{display: 'flex', 
                                flexDirection: 'row', 
                                paddingTop: 14, 
                                paddingBottom: 14, 
                                alignItems: "center"}}>
                                <text style={{width: 72}}>{'版本号：'}</text>
                                <Input 
                                    type={'number'}
                                    placeholder={'请输入版本号'}
                                    onChange={(e) => {
                                        this.setState({
                                            version: e.target.value,
                                        })
                                    }}
                                    />
                            </div>
                            <TextArea rows={4}
                                onChange={(e) => {
                                    this.setState({
                                        updateInfo: e.target.value,
                                    })
                                }}/>
                            <Button 
                                style={{width: 200}}
                                type="primary" 
                                className={styles.sureBtn}
                                onClick={() => {
                                    this._createRNVersion();
                                }}>
                                {'确定'}
                        </Button>    
                        </div>
                    </div>
                )
        }else {
            return null;
        }
    }

    _createRNVersion = () => {
        if(!this.state.version) {
            message.error('请填写版本号');
            return;
        }

        let rnInfo = this.props.rnInfo;
        if(!rnInfo || !this.props.versionId) {
            message.error('基础信息缺失')
            return;
        }

        rnInfo.version = parseInt(this.state.version);
        rnInfo.desc = this.state.updateInfo || '';
        rnInfo.versionId = this.props.versionId || 0;
        API.createRNVersion(
            rnInfo,
            {
                success: (data) => {
                    console.log('aaaa:' , data.versionId);
                    // router.push({
                    //     pathname : '/rn/RNVersionList', 
                    //     query: {versionId: data.versionId}});
                    router.go(-1);
                },
                fail: (msg) =>{}
            }
        )
    }
}