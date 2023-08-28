import { Fragment } from 'react';
import Head from 'next/head';
import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-util';

function AllPostsPage(props: Props) {
    return (
        <Fragment>
            <Head>
                <title>All Post</title>
                <meta
                    name='description'
                    content='A list of all programming tutorials'
                />
            </Head>
            <AllPosts posts={props.posts} />
        </Fragment>
    );
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
}

export default AllPostsPage;

//################ Type ###################
type Props = {
    posts: any[];
};
