import {RNVersionDO} from '../net/DTO';
import React, { Component } from 'react';
import { Tag, Button, Switch } from 'antd';
import styles from './RNStyles.css';

type Props = {
    rnInfo: RNVersionDO,
    delete: (id: number)=>void
}

export default class RNVersionItem extends Component<Props> {

    render() {
        let {id, version, createTime, size, desc, url} = this.props.rnInfo;
        return (
             <div style={{display: 'flex', 
                    flexDirection: 'column', 
                    padding: 14,
                    alignItems: 'left',
                    textAlign: 'left'}}>
                <text style={{fontSize: 20, color: '#333333'}}>{'版本：' + version}</text>
                <text>{createTime}</text>
                <div style={{marginTop: 14, marginBottom: 14}}>
                    <Button 
                            type="primary" 
                            className={styles.appDetailOperateView}
                            onClick={() => {
                                window.location.href = url;
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
                </div>
                <text>{desc}</text>
             </div>   
        )
    }
}