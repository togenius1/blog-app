import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';

import '@/styles/globals.css';
import Layout from '@/components/layout/layout';
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
