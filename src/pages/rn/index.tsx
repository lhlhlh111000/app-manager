import React, { Component } from 'react';
import AppList from '../app';
import { AppDO } from '../net/DTO';
import { List, Card } from 'antd';
import router from 'umi/router';
import AppItem from '@/components/AppItem';
import styles  from '../app/index.css';


export default class RNAppList extends Component {

    render() {
        return(
            <AppList
                hideNewBtnShow={true}
                renderItem={this._renderItem}
            />
        );
    }

    _renderItem = (item: AppDO) => {
        let queryParams = {
            appId: item.id
        }
        return(
            <List.Item onClick={() => {
                router.push({
                    pathname : '/rn/AppVersionList', 
                    query: queryParams});
            }}>
                <Card>
                    <Card.Grid className={styles.card}>
                        <AppItem
                            itemInfo={item}
                            hideVersion={true}
                            />
                    </Card.Grid>
                </Card>
            </List.Item>
        );
    }
}