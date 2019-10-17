import React from 'react';
import { Steps, Button, message } from 'antd';
import styles from './AppCreate.css';
import AppUpload from './AppUpload';
import AppInfoConfirm from './AppInfoConfirm';
import { AppDO } from '../net/DTO';

const { Step } = Steps;

const steps = [
    {
      title: '上传',
    },
    {
      title: '填写',
    },
    {
      title: '完成',
    },
];

type State = {
  currentIndex: number, appInfo?: AppDO
};

export default class AppCreate extends React.Component<Object, State> { 

    constructor(props: any) {
        super(props);
        this.state = {
          currentIndex: 0,
        };
    }

    render() {
        return(
          <div className={styles.content}>
            <div className={styles.steps}>
              <Steps 
                current={this.state.currentIndex} 
                size='small'>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div className={styles.contentView}>
              {this._contentView()}
            </div>
          </div>
        );
    }

    _contentView = () => {
      if(0 == this.state.currentIndex) {
        return this._uploadView();
      }else if(1 == this.state.currentIndex) {
        return this._infoView();
      }
    }

    _uploadView = () => {
      return(
        <AppUpload
          onResult={(info) => {
              this.setState({
                appInfo: info,
                currentIndex: 1,
              })
          }}
        />
      )
    }

    _infoView = () => {
      return(
        <AppInfoConfirm
          appInfo={this.state.appInfo}
          />
      );
    }
}