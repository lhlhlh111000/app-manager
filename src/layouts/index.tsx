import React from 'react';
import styles from './index.css';
import {Layout, Menu} from 'antd';
import { Navigators } from '../pages/router';
import { WBD } from '../pages/router';

const {Header, Sider, Content, Footer} = Layout;

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <Header>
        <div className={styles.logo}/>
        <div className={styles.login}>
          <img/> 
          <li>欢迎你，xxx</li>
        </div>
      </Header>
      <Layout className={styles.content}>
        <Sider>
          <Navigators/>
        </Sider>
        <Layout>
          <WBD/>
          <Content style={{padding: '24px 0'}}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
