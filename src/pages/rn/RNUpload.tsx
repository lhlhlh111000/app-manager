import React, { Component } from "react";
import { RNVersionDO } from "../net/DTO";
import { Upload, Icon, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import styles from './RNStyles.css';

const { Dragger } = Upload;

type Props = {
    onResult: (info: RNVersionDO) => void
}

export default class RNUpload extends Component<Props> {

    render() { 
        let s = {
            name: 'file',
            action: '/rn/manager/rn-version-upload',
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