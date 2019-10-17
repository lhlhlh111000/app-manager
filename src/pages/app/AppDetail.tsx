import React, { Component } from 'react';
import AppBasicInfo from './AppBasicInfo';
import AppDetailItem from './AppDetailItem';
import { List, Modal } from 'antd';
import API from '../net/API';
import { AppDO, VersionDO } from '../net/DTO';

type Props = {location: {query: {appId?: number}}};
type States = {appId?: number, 
    appInfo?: AppDO, 
    versionList?: Array<VersionDO>,
    visible: boolean,
    confirmLoading: boolean,
    versionId?: number
}

export default class AppDetail extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        this.state = {
            appId: this.props.location.query.appId,
            visible: false,
            confirmLoading: false,
        }
    }

    componentDidMount() {
        this._appInfo();
        this._versionList();
    }

    render() {
        return(
            <div>
                <AppBasicInfo appInfo={this.state.appInfo}/>
                <List
                    dataSource={this.state.versionList}
                    renderItem={this._renderItem}
                    locale={{
                        emptyText: '暂无版本信息',
                    }}
                    />
                <Modal
                    title="提示"
                    cancelText={'取消'}
                    okText={'确定'}
                    visible={this.state.visible}
                    onOk={this._deleteVersion}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                    confirmLoading={this.state.confirmLoading}
                    >
                    {'确定删除当前版本？'}            
                </Modal>    
            </div>
        );
    }

    _renderItem = (item: VersionDO, index: number) => {
        return(
            <List.Item>
            <AppDetailItem 
                versionInfo={item}
                delete={this._showModal}
                switch={this._switchVersion}/>
            </List.Item>
        );
    }

    _appInfo = () => {
        let appId = 0;
        if(this.state.appId) {
            appId = this.state.appId;
        }
        API.appInfo(
            appId, {
                success: (data: AppDO) => {
                    this.setState({
                        appInfo: data,
                    })
                },
                fail: (msg: string) => {
                    this.setState({
                        appInfo: undefined,
                    })
                }
            }
        )
    }

    _versionList = () => {
        let appId = 0;
        if(this.state.appId) {
            appId = this.state.appId;
        }
        API.versionList(
            appId, {
                success: (data: Array<VersionDO>) => {
                    this.setState({
                        versionList: data,
                    })
                },
                fail: (msg: string) => {
                    this.setState({
                        versionList: [],
                    })
                }
            }
        )
    }

    _showModal = (versionId: number) => {
        this.setState({
            visible: true,
            versionId
        })
    }

    _deleteVersion = () => {
        this.setState({
            confirmLoading: true,
        })
        API.deleteVersion(
            this.state.versionId || 0, {
                success: ()=> {
                    if(this.state.versionList) {
                        let removeIndex = this.state.versionList.findIndex(item => item.id == this.state.versionId);
                        this.state.versionList.splice(removeIndex, 1)
                        this.setState({
                            versionList: this.state.versionList,
                        })
                    }
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                },
                fail: (msg: string) => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                }
            }
        )
    }

    _switchVersion = (versionId: number, checked: boolean) => {
        API.switchVersion(
            versionId, checked, {
                success: () => {
                    if(this.state.versionList) {
                        let switchVersion = this.state.versionList.find(item => item.id == versionId);
                        let index =this.state.versionList.findIndex(item => item.id == versionId);
                        if(switchVersion) {
                            switchVersion.enable = checked;
                            this.state.versionList.splice(index, 1, switchVersion);
                            this.setState({
                                versionList: this.state.versionList,
                            })
                        }
                    }
                },
                fail: (msg: string) => {
                    // Do nothing
                }
            }
        )
    }
}