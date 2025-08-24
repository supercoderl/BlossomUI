'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, theme, ConfigProvider, type MenuProps } from 'antd';
import getNavList from './menu';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getThemeBg } from '@/utils';
import { Link, usePathname } from '../../navigation';
import styles from './index.module.css';
import { useSignalRContext } from '@/providers/signalRProvider';
import { Notification } from '@/types/notification';
import { AdminHeader } from './header';
import { getNotifications } from '@/app/[locale]/dashboard/api';
import { useUserContext } from '@/providers/userProvider';

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
    const { isConnected, connection, isConnecting } = useSignalRContext();
    const { userInfo } = useUserContext();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);

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
        onLoad();
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

        connection.on("receiveData", (payload: any) => {
            setUnreadCount((count) => count + 1);
            alertSound?.current?.play().catch(console.warn);
            if (payload.data) {
                setNotifications((prev) => [payload.data, ...prev]);
            }
        })

        return () => {
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

    const onLoad = async () => {
        await getNotifications({
            query: { page: 1, pageSize: 5 },
            searchTerm: '',
            includeDeleted: false
        }).then((res: any) => {
            if (res && res.success) {
                setNotifications(res.data.items);
            }
        })
    }

    const divRef = useRef<HTMLDivElement>(null);

    return (
        <ConfigProvider
            theme={{
                algorithm: curTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#DA0C81', // Màu xanh lá (tuỳ chọn màu bạn muốn)
                }
            }}
        >
            <Layout style={{ minHeight: "100vh" }} ref={divRef}>
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
                        <AdminHeader
                            curTheme={curTheme}
                            userInfo={userInfo}
                            ref={divRef}
                            toggleTheme={toggleTheme}
                            loading={isConnecting}
                            notifications={notifications}
                        />
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
        </ConfigProvider>
    );
};

export default CommonLayout;