import React from 'react';
import { Input, Radio, Button, List, Card } from 'antd';
import styles  from './index.css';
import { any } from 'prop-types';
import AppItem from '../../components/AppItem';
import router from 'umi/router';
import API from '../net/API';
import { AppDO } from '../net/DTO';

type State = {appList: Array<AppDO> | []}

type Props = {
    renderItem?: (item: AppDO) => React.ReactNode,
    hideNewBtnShow?: boolean,
}

export default class AppList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            appList: []
        }
    }

    componentDidMount() {
        this._appList();
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <Radio.Group 
                        buttonStyle="solid"
                        onChange={(e) => {
                            let platfrom;
                            if('iOS' === e.target.value) {
                                platfrom = '1';
                            }else if('Android' == e.target.value) {
                                platfrom = '0';
                            }
                            this._appList(platfrom);
                        }}>
                        <Radio.Button value="iOS">iOS</Radio.Button>
                        <Radio.Button value="Android">Android</Radio.Button>
                    </Radio.Group>
                    {this.props.hideNewBtnShow ? 
                        null: 
                        <Button 
                            type="primary"
                            className={styles.new}
                            onClick={() => {
                                router.push('/app/AppCreate');
                            }}>
                            {'新建'}
                        </Button>
                    }
                </div>
                <div className={styles.container}>
                    <List
                        className={styles.list}
                        grid={{ gutter: 16, 
                            column: 3, }}
                        dataSource={this.state.appList}
                        renderItem={this.props.renderItem ?  this.props.renderItem : this._renderItem}
                        locale={{
                            emptyText: '暂无数据',
                        }}
                    />
                </div>
            </div>
        )
    }

    _renderItem = (item: AppDO) => {
        let queryParams = {
            appId: item.id
        }
        return(
            <List.Item onClick={() => {
                router.push({
                    pathname : '/app/AppDetail', 
                    query: queryParams});
            }}>
                <Card>
                    <Card.Grid className={styles.card}>
                        <AppItem
                            itemInfo={item}
                            />
                    </Card.Grid>
                </Card>
            </List.Item>
        );
    }

    _appList = (platfrom?: string) => {
        API.appList(platfrom, {
            success: (data: Array<AppDO>) => {
                this.setState({
                    appList: data,
                })
            },
            fail: (message: string) => {
                this.setState({
                    appList: [],
                })
            }
        })
    }
}