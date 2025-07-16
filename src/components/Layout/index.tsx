'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, ConfigProvider, Badge, Popover, type MenuProps, Typography } from 'antd';
import getNavList from './menu';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    BellOutlined,
    DollarOutlined,
    MoonOutlined,
    SunOutlined
} from '@ant-design/icons';
import { getThemeBg } from '@/utils';
import { Link, usePathname } from '../../navigation';
import styles from './index.module.css';
import { UserCookieInfo } from '@/types/user';
import { useSignalRContext } from '@/providers/signalRProvider';
import { UserRoles } from '@/enums/userRoles';
import { AdminNotification } from '@/types/notification';
import { UserContext } from '@/providers/userProvider';

const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

interface IProps {
    children: React.ReactNode,
    curActive: string,
    defaultOpen?: string[]
}

const onLogout = () => {
    localStorage.removeItem("isDarkTheme")
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link rel="noopener noreferrer" href="/profile/me">
                Personal Center
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="#">
                Switch account
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a onClick={onLogout} rel="noopener noreferrer" href="/user/login">
                Log out
            </a>
        ),
    },
];

const CommonLayout: React.FC<IProps> = ({ children, curActive, defaultOpen = ['/'] }) => {
    const {
        token: { borderRadiusLG, colorTextBase, colorWarningText },
    } = theme.useToken();

    const t = useTranslations('global');

    const locale = useLocale();
    const otherLocale: any = locale === 'en' ? ['zh', '中'] : ['en', 'En'];
    const alertSound = useRef<HTMLAudioElement | null>(null);
    const [interacted, setInteracted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const navList = getNavList(t);
    const { isConnected, connection } = useSignalRContext();
    const [unreadCount, setUnreadCount] = useState(0);
    const [userInfo, setUserInfo] = useState<UserCookieInfo>();

    const [curTheme, setCurTheme] = useState<boolean>(false);
    const toggleTheme = () => {
        const _curTheme = !curTheme;
        setCurTheme(_curTheme);
        localStorage.setItem('isDarkTheme', _curTheme ? 'true' : '');
    }

    const handleSelect = (row: { key: string }) => {
        if (row.key.includes('http')) {
            window.open(row.key)
            return
        }
        router.push(row.key)
    }

    useEffect(() => {
        const isDark = !!localStorage.getItem("isDarkTheme");
        setCurTheme(isDark);
        alertSound.current = new Audio("/audios/alert.mp3");
    }, []);

    useEffect(() => {
        const handleInteraction = () => {
            setInteracted(true);
            document.removeEventListener("click", handleInteraction);
        };

        document.addEventListener("click", handleInteraction);
        return () => document.removeEventListener("click", handleInteraction);
    }, []);

    useEffect(() => {
        if (!isConnected || !connection) return;

        console.log("connected");

        connection.on("getProfileInfo", (data?: UserCookieInfo | null) => {
            if (data) {
                setUserInfo(data);

                if (data.role === UserRoles.Admin) {
                    connection.invoke("JoinGroup", "administrators");
                }
            }
        });

        connection.on("receiveData", (data?: AdminNotification) => {
            setUnreadCount((count) => count + 1);
            alertSound?.current?.play().catch(console.warn);
        })

        return () => {
            connection.off("getProfileInfo");
            connection.off("receiveData");
        };
    }, [isConnected, connection]);

    useEffect(() => {
        if (unreadCount > 0) {
            document.title = `(${unreadCount}) You have new message | Blossom UI`;
        } else {
            document.title = "Blossom UI";
        }
    }, [unreadCount]);

    return (
        <ConfigProvider
            theme={{
                algorithm: curTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#DA0C81', // Màu xanh lá (tuỳ chọn màu bạn muốn)
                }
            }}
        >
            <UserContext.Provider value={userInfo}>
                <Layout style={{ minHeight: "100vh" }}>
                    <Sider
                        theme={curTheme ? "dark" : "light"}
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                        }}
                        onCollapse={(collapsed, type) => {
                        }}
                    >
                        <span className={styles.logo}>
                            <Link href="/" className={styles.logoLink}>
                                <img className='w-full' src={curTheme ? '/logo.png' : '/logo.png'} alt="logo" />
                            </Link>
                        </span>
                        <Menu
                            theme={curTheme ? "dark" : "light"}
                            mode="inline"
                            defaultSelectedKeys={[curActive]}
                            items={navList}
                            defaultOpenKeys={defaultOpen}
                            onSelect={handleSelect}
                        />
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0, paddingRight: 16, ...getThemeBg(curTheme), display: 'flex' }}>
                            <div className={styles.rightControl}>
                                <span className={styles.group}>
                                    <Popover content={<div style={{ width: '100%' }}><img width={180} src="/pay.png" /></div>} title="Support the author below!!">
                                        <DollarOutlined style={{ color: 'red' }} /> Buy me a coffee
                                    </Popover>
                                </span>
                                <span className={styles.msg}>
                                    <Badge dot>
                                        <BellOutlined />
                                    </Badge>
                                </span>
                                <Link href={pathname as any} locale={otherLocale[0]} className={styles.i18n}>
                                    <Text>{otherLocale[1]}</Text>
                                </Link>
                                <span onClick={toggleTheme} className={styles.theme}>
                                    {
                                        !curTheme ? <SunOutlined style={{ color: colorWarningText }} /> : <MoonOutlined />
                                    }
                                </span>
                                <div className={styles.avatar}>
                                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                                        <Avatar
                                            src={userInfo?.avatarUrl}
                                            style={{ color: '#fff', backgroundColor: colorTextBase }}
                                        >
                                            {userInfo?.firstName + " " + userInfo?.lastName}
                                        </Avatar>
                                    </Dropdown>
                                </div>
                            </div>
                        </Header>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div
                                style={{
                                    padding: 24,
                                    minHeight: 520,
                                    ...getThemeBg(curTheme),
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                {children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Blossom Nails ©{new Date().getFullYear()} Created by <a href="https://github.com/supercoderl">Supercoderl</a>
                        </Footer>
                    </Layout>
                </Layout>
            </UserContext.Provider>
        </ConfigProvider>
    );
};

export default CommonLayout;