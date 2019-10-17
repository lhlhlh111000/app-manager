import React, { Component } from 'react';
import NetUtil from '../net/NetUtil';
import API from '../net/API';
import { RNVersionDO } from '../net/DTO';
import { List, Button } from 'antd';
import RNVersionItem from './RNVersionItem';
import styles from './RNStyles.css';
import router from 'umi/router';

type Props = {location: {query: {versiondId: number}}};

type States = {rnList?: Array<RNVersionDO>}

export default class RNVersionList extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        this.state = {
            rnList: [],
        }
    }

    componentDidMount() {
        this._rnVersionList();
    }

    render() {
        let queryParams = {
            versiondId: this.props.location.query.versiondId,
        }
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{padding: 14,}}>
                    <Button 
                        type="primary"
                        className={styles.new}
                        onClick={() => {
                            router.push({ 
                                pathname: '/rn/RNCreate', 
                                query: queryParams});
                        }}>
                        {'新建'}
                    </Button>    
                </div>
                <List
                    dataSource={this.state.rnList}
                    renderItem={this._renderItem}
                    locale={{
                        emptyText: '暂无版本信息',
                    }}
                    />
            </div> 
        )
    }

    _renderItem = (item: RNVersionDO, index: number) => { 
        return (
            <RNVersionItem
                rnInfo= {item}
                delete = {(id) => {

                }}
                />
        )
    }

    _rnVersionList = () => {
        API.rnVersionList(
            this.props.location.query.versiondId,
            {
                success: (rnVersionList: Array<RNVersionDO>) => {
                    this.setState({
                        rnList: rnVersionList || [],
                    })
                },
                fail: () => {}
            }
        )
    }
}