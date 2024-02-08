import React, { useState } from 'react';
import { Button, Drawer, Layout, Menu, Space, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import s from './main-page.module.scss';

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    height: "100dvh",
    // width: 'calc(50% - 8px)',
    // maxWidth: 'calc(50% - 8px)',
};


export const MainPage: React.FC = () => {
    const { Header, Footer, Sider, Content } = Layout;
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
        (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
        }),
    );

    return (
        <>

            <Layout hasSider>
                <Sider
                    trigger={null}
                    collapsed={collapsed}
                    // breakpoint="lg"
                    collapsedWidth="30"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{
                        overflow: 'auto',
                        height: '100dvh',
                        position: 'fixed', 
                        left: 0,
                        top: 0,
                        bottom: 0
                    }}
                >
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
                </Sider>
                <Layout style={{
                    // position: 'relative'
                }}>
                    <Button
                        type="text"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 'calc(50vh - 64px - 24px)',
                            fontSize: '16px',
                            padding: 0,
                            width: "0",
                            borderLeft: "20px solid red",
                            borderBottom: "5px solid transparent",
                            borderTop: "5px solid transparent",
                            // width: 64,
                            height: 64,
                        }}
                    >
                        <Space style={{ position: "relative", left: "-15px" }}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Space>
                    </Button>
                    <Header style={{
                        padding: 0,
                        // background: colorBgContainer 
                    }}>Header</Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial'}}>

                        <div
                            style={{
                                position: "relative",
                                padding: 24,
                                // minHeight: 360,
                                // background: colorBgContainer,
                                // borderRadius: borderRadiusLG,
                            }}
                        >

                            <p>long content</p>
                            {
                                // indicates very long content
                                Array.from({ length: 100 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        {index % 20 === 0 && index ? 'more' : '...'}
                                        <br />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>

            {/* <div className={s.mainContainer}>
                <nav
                    style={{ width: 300, height: 300, background: "#f00" }}
                    className={s.width200} id='nav-container'>
                </nav>
                <div className='pageContent'>
                    <Button type="primary" onClick={onToggle}>
                        Open
                    </Button>
                    <div className='header'>header</div>
                    <div className='content'>content</div>
                    <div className='footer'>footer</div>
                </div>
            </div>
            <Drawer
                getContainer="#nav-container"
                mask={false}
                closable={false}
                title="Basic Drawer"
                placement="left"
                onClose={onClose} open={open}
            >
                <div className={s.relative}>
                    <div className={s.toggleBtn}>
                        <Button type="primary" onClick={onToggle}>
                            Open
                        </Button>
                    </div>
                    <p>Some contents1...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
            </Drawer> */}
        </>
    );
};
