import React, { Component } from 'react';
import styles from './AppCreate.css';
import { Upload, Icon, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { AppDO } from '../net/DTO';
const { Dragger } = Upload;

type Props = {
    onResult: (info: AppDO) => void
}

export default class AppUpload extends Component<Props> {

    constructor(props: any) {
        super(props);
    }

    render() { 
        let s = {
            name: 'file',
            action: '/version/manager/app-version-upload',
            onChange: (info: UploadChangeParam<UploadFile>) => {
                const { status, response } = info.file;
                if (status === 'done') {  
                  this.props.onResult(response.data);
                } else if (status === 'error') {
                  message.error(`文件上传失败！`);
                }
            },
        }
        
        return(
            <div className={styles.upload}>
                <Dragger {...s}>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽到这上传</p>
                </Dragger>
            </div>
        );
    }
}