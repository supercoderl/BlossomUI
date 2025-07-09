'use client';
import React, { useState, useEffect } from 'react';
import { Layout, theme, ConfigProvider } from 'antd';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getThemeBg } from '@/utils';
import Header from '../Home/header';
import MobileWrapper from './mobile-wrapper';
import { PreLoader } from '../Loading/preloader';

const { Content, Footer } = Layout;

interface IProps {
    children: React.ReactNode,
    curActive: string,
    defaultOpen?: string[],
    isDark?: boolean,
    loading?: boolean
}

const HomeLayout: React.FC<IProps> = ({
    children,
    curActive,
    defaultOpen = ['/'],
    isDark = false,
    loading = false
}) => {
    const {
        token: { },
    } = theme.useToken();

    const t = useTranslations('global');
    const [openWrapper, setOpenWrapper] = useState(false);
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
            <PreLoader loading={loading} />
            <Layout style={{ minHeight: "100vh" }} data-aos="fade-zoom-in" data-aos-delay="300" data-aos-duration="2500">
                <Layout>
                    <Header handleOpen={setOpenWrapper} isDark={isDark} isOpen={openWrapper} />
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

            <MobileWrapper isOpen={openWrapper} handleOpen={setOpenWrapper} />
        </ConfigProvider>
    );
};

export default HomeLayout;