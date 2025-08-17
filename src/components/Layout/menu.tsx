import {
    FundOutlined,
    LayoutOutlined,
    BarChartOutlined,
    DesktopOutlined,
    ScheduleOutlined,
    CalculatorOutlined,
    UserOutlined,
    WalletOutlined,
    BuildOutlined,
    OpenAIOutlined,
    PartitionOutlined,
    FileExcelOutlined,
    PieChartOutlined,
    LinkOutlined,
    FileMarkdownOutlined,
    CloudOutlined,
    FundViewOutlined,
    CalendarOutlined,
    CommentOutlined,
    TransactionOutlined,
    AccountBookOutlined,
    AppstoreOutlined,
    FileImageOutlined,
    ContactsOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import React from 'react';

const getNavList = (t: any) => {
    return [
        {
            key: '/',
            icon: <DesktopOutlined />,
            label: t('dashboard'),
            children: [
                {
                    key: '/dashboard',
                    icon: <BarChartOutlined />,
                    label: t('customChart')
                },
                // {
                //     key: '/dashboard/monitor',
                //     icon: <FundOutlined />,
                //     label: t('monitor')
                // },
                // {
                //     key: '/dashboard/chart',
                //     icon: <PieChartOutlined />,
                //     label: t('chart')
                // },
                // {
                //     key: '/dashboard/rpa',
                //     icon: <PartitionOutlined />,
                //     label: t('rpa')
                // }
            ]
        },
        {
            key: '/user',
            icon: <UserOutlined />,
            label: 'User',
            children: [
                {
                    key: '/user/list',
                    icon: <UserOutlined />,
                    label: t('userList')
                },
                {
                    key: '/user/work-schedule',
                    icon: <CalendarOutlined />,
                    label: t('workSchedule')
                },
            ]
        },
        {
            key: '/service',
            icon: <CloudOutlined />,
            label: 'Service',
            children: [
                {
                    key: '/service/list',
                    icon: <CloudOutlined />,
                    label: t('serviceList')
                },
                {
                    key: '/service/category/list',
                    icon: <AppstoreOutlined />,
                    label: 'Category'
                },
                {
                    key: '/service/gallery',
                    icon: <FileImageOutlined />,
                    label: 'Gallery'
                },
            ]
        },
        {
            key: '/promotion/list',
            icon: <FundViewOutlined />,
            label: t('promotionList')
        },
        {
            key: '/review/list',
            icon: <CommentOutlined />,
            label: t('reviewList')
        },
        {
            key: '/agents',
            icon: <OpenAIOutlined />,
            label: t('agents')
        },
        // {
        //     key: '/excel',
        //     icon: <FileExcelOutlined />,
        //     label: t('excel')
        // },
        // {
        //     key: '/md',
        //     icon: <FileMarkdownOutlined />,
        //     label: t('mdDoc')
        // },
        // {
        //     key: 'http://flowmix.turntip.cn/docx',
        //     icon: <LinkOutlined />,
        //     label: t('outlink')
        // },
        // {
        //     key: '/formEngine',
        //     icon: <CalculatorOutlined />,
        //     label: t('formEngine')
        // },
        // {
        //     key: '/dragMode',
        //     icon: <BuildOutlined />,
        //     label: t('dragMode')
        // },
        // {
        //     key: '/board',
        //     icon: <LayoutOutlined />,
        //     label: t('board')
        // },
        {
            key: '/booking',
            icon: <ScheduleOutlined />,
            label: 'Booking',
            children: [
                {
                    key: '/booking/list',
                    icon: <AccountBookOutlined />,
                    label: t('bookingList')
                },
                {
                    key: '/booking/transaction/list',
                    icon: <TransactionOutlined />,
                    label: t('transactions')
                }
            ]
        },
        // {
        //     key: '/resource',
        //     icon: <WalletOutlined />,
        //     label: t('resource')
        // },
        {
            key: '/contact',
            icon: <ContactsOutlined />,
            label: t('contact'),
            children: [
                {
                    key: '/contact/list',
                    icon: <ContactsOutlined />,
                    label: t('contactList')
                },
            ]
        },
        {
            key: '/blog',
            icon: <ProfileOutlined />,
            label: 'Blog',
            children: [
                {
                    key: '/blog/list',
                    icon: <ProfileOutlined />,
                    label: 'Blog'
                },
            ]
        }
    ]
}

export default getNavList