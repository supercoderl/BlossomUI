'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, ConfigProvider, Badge, Popover, type MenuProps, Typography } from 'antd';
import getNavList from './menu';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getThemeBg } from '@/utils';
import { usePathname } from '../../navigation';
import Header from '../Home/header';

const { Content, Footer } = Layout;

interface IProps {
    children: React.ReactNode,
    curActive: string,
    defaultOpen?: string[],
    isDark?: boolean
}

const onLogout = () => {
    localStorage.removeItem("isDarkTheme")
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="#">
                Personal Center
            </a>
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
            <a target="_blank" onClick={onLogout} rel="noopener noreferrer" href="/user/login">
                Log out
            </a>
        ),
    },
];

const HomeLayout: React.FC<IProps> = ({ children, curActive, defaultOpen = ['/'], isDark = false }) => {
    const {
        token: { },
    } = theme.useToken();

    const t = useTranslations('global');

    const locale = useLocale();
    const otherLocale: any = locale === 'en' ? ['zh', '中'] : ['en', 'En'];

    const router = useRouter();

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
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: curTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#DA0C81',
                }
            }}
        >
            <Layout style={{ minHeight: "100vh" }}>
                <Layout>
                    <Header isDark={isDark} />
                    <Content>
                        <div
                            style={{
                                ...getThemeBg(curTheme),
                                transform: 'none'
                            }}
                        >
                            <div className='h-full'>
                                {children}
                            </div>
                        </div>
                        <Footer style={{ textAlign: 'center' }}>
                            Blossom Nails ©{new Date().getFullYear()} Created by <a href="https://github.com/supercoderl">Supercoderl</a>
                        </Footer>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default HomeLayout;