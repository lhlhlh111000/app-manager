import React, { Component } from "react";
import API from '../net/API';
import { VersionDO } from "../net/DTO";
import { List, Card } from "antd";
import AppVersionItem from "./AppVersionItem";
import styles from "./RNStyles.css";
import router from 'umi/router';

type Props = {location: {query: {appId: number}}};

type States = {
    versionList?: Array<VersionDO>
}

export default class AppVersionList extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        this.state = {
            versionList: [],
        }
    }

    componentDidMount() {
        this._appVersionList();
    }

    render() {
        return (
            <div>
                <List
                    className={styles.list}
                    dataSource={this.state.versionList}
                    renderItem={this._renderItem}
                    grid={{ gutter: 16, 
                        column: 3, }}
                    locale={{
                        emptyText: '暂无版本信息',
                    }}
                    />
            </div>
        );
    }

    _renderItem = (item: VersionDO, index: number) => {
        let queryParams = {
            versiondId: item.id,
        }
        return(
            <List.Item onClick={() => {
                router.push({
                    pathname : '/rn/RNVersionList', 
                    query: queryParams});
            }}>
                <Card>
                    <Card.Grid className={styles.card}>
                    <AppVersionItem 
                        verisonInfo={item}/>
                    </Card.Grid>
                </Card>
            </List.Item>
        );
    }

    _appVersionList = () => {
        API.versionList(
            this.props.location.query.appId,
            {
                success: (data: VersionDO[]) => {
                    this.setState({
                        versionList: data,
                    })
                },
                fail: () =>{

                }
            }
        )
    }
}