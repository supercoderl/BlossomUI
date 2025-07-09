'use client'
// import { useTranslations} from 'next-intl';
import Layout from '@/components/Layout';
import Editor from './Editor';

export default function Order() {

    return (
        <Layout curActive='/dragMode'>
            <main style={{ minHeight: 'calc(100vh - 260px)' }}>
                <Editor />
            </main>
        </Layout>

    );
}