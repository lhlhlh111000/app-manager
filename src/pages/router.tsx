import React, { Component } from 'react';
import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Menu }from 'antd';
import router from 'umi/router';
import styles from '../layouts/index.css';

const routers = [
    { path: '/', breadcrumb: '首页' },
    { path: '/app', breadcrumb: 'APP版本'},
    { path: '/app/AppCreate', breadcrumb: '新增'},
    { path: '/rn', breadcrumb: 'RN版本'},
    { path: '/app/AppDetail', breadcrumb: '详情'},
    { path: '/rn/AppVersionList', breadcrumb: '版本列表'},
    { path: '/rn/RNVersionList', breadcrumb: '版本列表'},
    { path: '/rn/RNCreate', breadcrumb: '新增'},
];

class Navigators extends React.Component {
    
    render() {
        let menus: any = [];
        routers.forEach((item) => {
            if(item.path == '/app' || item.path == '/rn') {
                menus.push(
                    <Menu.Item 
                        key={item.breadcrumb}
                        onClick={() => {
                            router.push(item.path)
                        }}>
                        {item.breadcrumb}
                    </Menu.Item>
                );
            }
        })
        return(
            <Menu 
                theme="dark"
                defaultSelectedKeys={['APP版本']}>
                {menus}
            </Menu>
        );
    }
}

const WBD = withBreadcrumbs(routers)(({ breadcrumbs }) => (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.key} >
          <NavLink to={breadcrumb.match.path}>
            {breadcrumb.breadcrumb.props.children}
          </NavLink>
          {(index < breadcrumbs.length - 1) && <i> / </i>}
        </span>
      ))}
    </div>
));

export {Navigators, WBD};