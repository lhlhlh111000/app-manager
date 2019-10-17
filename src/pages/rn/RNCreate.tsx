import React, { Component } from "react";
import { Steps, Button, message } from 'antd';
import { RNVersionDO} from '../net/DTO';
import styles from './RNStyles.css';
import RNUpload from './RNUpload';
import RNInfoConfirm from './RNInfoConfirm';

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

type States = {
    currentIndex: number, 
    rnInfo?: RNVersionDO,
};

type Props = {location: {query: {versiondId: number}}};

export default class RNCreate extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        this.state = {
            currentIndex: 0,
        }
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
          <RNUpload
            onResult={(info) => {
                this.setState({
                  rnInfo: info,
                  currentIndex: 1,
                })
            }}
          />
        )
    }
  
    _infoView = () => {
        return(
          <RNInfoConfirm
              versionId={this.props.location.query.versiondId}
              rnInfo={this.state.rnInfo}
            />
        );
    }     
}