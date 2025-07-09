'use client'
// import { useTranslations} from 'next-intl';
import { Tabs, type TabsProps } from 'antd';
import Layout from '@/components/Layout';
import styles from './index.module.css';

const List = <div className={styles.fuildWrap}>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="流程图编辑器 - drawio" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="流程图编辑器 - drawio" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
    <div className="cardImg">
        <img src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/e4d7f3769920df513680e85f8ee0f06887bf903312edc9d3567412d0e145a189.jpg?x-oss-process=image/resize,w_764,m_lfit/format,webp" alt="可视化白板工具" />
    </div>
</div>

const items: TabsProps['items'] = [
    {
        key: '1',
        label: '图片',
        children: List,
    },
    {
        key: '2',
        label: '音频',
        children: List,
    },
    {
        key: '3',
        label: '视频',
        children: List,
    },
];


export default function Resource() {
    return (
        <Layout curActive='/resource'>
            <main style={{ minHeight: 'calc(100vh - 260px)' }}>
                <Tabs defaultActiveKey="1" items={items} />
            </main>
        </Layout>
    );
}
