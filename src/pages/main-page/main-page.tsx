import React, { useState } from 'react';
import { Button, Card, Divider, Drawer, Layout, Menu, Space, theme } from 'antd';
import {
    AndroidFilled,
    AppleFilled,
    AppleOutlined,
    CalendarTwoTone,
    HeartFilled,
    IdcardTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Main_page_light from "../../assets/imgs/Main_page_light.png"

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
                {/* <Sider
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
                </Sider> */}
                <Layout style={{
                    // position: 'relative'
                    minHeight: "100dvh",
                    backgroundPosition: "center",
                    backgroundImage: `url(${Main_page_light})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
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
                        height: "168px",
                        padding: "16px 24px",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#F0F5FF"
                        // background: colorBgContainer 
                    }}>
                        <div
                            style={{
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "18.2px"
                            }}
                        >Главная</div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingTop: "8px",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 700,
                                    fontSize: "38px",
                                    display: "flex",
                                    padding: "6px 0",
                                    flexDirection: "column",
                                    lineHeight: "49.4px"
                                }}
                            >

                                <p>
                                    {"Приветствуем тебя в CleverFit — приложении,"}
                                </p>
                                <p>
                                    {"которое поможет тебе добиться своей мечты!"}
                                </p>
                            </div>
                            <div
                                style={{
                                    width: "129px",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "18.2px"
                                }}
                            >

                                <Button icon={<SettingOutlined />} style={{ color: "black" }} type="link">Настройки</Button>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ overflow: 'initial' }}>

                        <div
                            style={{
                                position: "relative",
                                maxWidth: "800px",
                                padding: 24,
                                display: "flex",
                                flexDirection: "column",
                                gap: "24px"
                                // minHeight: 360,
                                // background: colorBgContainer,
                                // borderRadius: borderRadiusLG,
                            }}
                        >
                            <Card style={{
                                fontSize: "16px",
                                lineHeight: "20.8px"
                            }}>
                                C CleverFit ты сможешь:<br />
                                — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br />
                                — отслеживать свои достижения в разделе статистики, сравнивая свои результаты c нормами и рекордами;<br />
                                — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы o тренировках;<br />
                                — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
                            </Card>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px"
                            }}>
                                <Card style={{
                                    fontSize: "20px",
                                    lineHeight: "26px",
                                    fontWeight: 500,
                                }}>
                                    <p>{"CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!"}</p>
                                </Card>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "16px"
                                    }}
                                >
                                    <Card
                                        style={{
                                            width: "240px"
                                        }}
                                        size='small'
                                        title="Расписать тренировки"
                                        headStyle={{ display: "flex", alignItems: "center", justifyContent: "center", height: "45px" }}
                                        bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
                                        bordered={false} >
                                        <Button type='link'>
                                            <HeartFilled />
                                            Тренировки
                                        </Button>
                                    </Card>
                                    <Card
                                        style={{
                                            width: "240px"
                                        }}
                                        size='small'
                                        title="Назначить календарь"
                                        headStyle={{ display: "flex", alignItems: "center", justifyContent: "center", height: "45px" }}
                                        bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
                                        bordered={false} >
                                        <Button type='link'>
                                            <CalendarTwoTone />
                                            Календарь
                                        </Button>
                                    </Card>
                                    <Card
                                        style={{
                                            width: "240px"
                                        }}
                                        size='small'
                                        title="Заполнить Профиль"
                                        headStyle={{ display: "flex", alignItems: "center", justifyContent: "center", height: "45px" }}
                                        bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
                                        bordered={false} >
                                        <Button type='link'>
                                            <IdcardTwoTone />
                                            Профиль
                                        </Button>
                                    </Card>
                                </div>
                            </div>


                            {/* <p>long content</p>
                            {
                                // indicates very long content
                                Array.from({ length: 100 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        {index % 20 === 0 && index ? 'more' : '...'}
                                        <br />
                                    </React.Fragment>
                                ))
                            } */}
                        </div>
                    </Content>
                    <Footer style={{ padding: "42px 24px", background: "none", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                        <Button type='link'>
                            Смотреть отзывы
                        </Button>
                        <Card
                            style={{
                                width: "240px"
                            }}
                            size='small'
                            title={
                                <div style={{
                                    boxSizing: "border-box",
                                    padding: "0",
                                    display: 'flex',
                                    gap: "8px",
                                    flexDirection: "column",
                                }}>
                                    <Button style={{ textAlign: "start", padding: "0 20px", height: "21px", fontSize: "16" }} type='link'>Скачать на телефон</Button>
                                    <Button style={{ textAlign: "start", padding: "0 20px", height: "18px", fontSize: "16" }} type='link' disabled>Доступно в про-тарифу</Button>
                                </div>
                            }
                            headStyle={{ height: "71px", padding: "4px", }}
                            bodyStyle={{ textAlign: "center", height: "56px", padding: "12px 0", }}
                            bordered={false} >
                            <Button style={{ color: "black", width: "50%" }} type='link' color='balck'>
                                <AndroidFilled />
                                Android
                            </Button>
                            <Button style={{ color: "black", width: "50%" }} type='link' color='balck'>
                                <AppleFilled />
                                IOS
                            </Button>
                        </Card>
                        {/* <div style={{ display: 'flex', flexDirection: "column" }}>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <div>Скачать на телефон</div>
                                <div>Доступно в про-тарифу</div>
                            </div>
                            <Divider />
                            <div style={{ display: 'flex' }}>
                                <div>Android</div>
                                <div>IOS</div>
                            </div>
                        </div> */}
                    </Footer>
                </Layout>
            </Layout >
        </>
    );
};
