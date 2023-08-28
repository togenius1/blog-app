import { Fragment } from 'react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/posts-util';

function PostDetailPage(props: Props) {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name='description' content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    );
}

export function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;
    const slug = params?.slug;

    if (!slug) {
        return {
            notFound: true,
        };
    }

    const postData = getPostData(String(slug));

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, '')
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
}

export default PostDetailPage;

//################## Type ##################
type Props = {
    post: Post;
};

interface Post {
    title: string;
    slug: string;
    image: string;
    content: string;
    excerpt: string;
}
