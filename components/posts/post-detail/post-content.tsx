import { Fragment } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './post-content.module.css';
import PostHeader from './post-header';

function PostContent(props: Props) {
    const { post } = props;

    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    // const CustomImage = (image: any) => (
    //     <div className={classes.image}>
    //         <Image
    //             src={`/images/posts/${post.slug}/${image?.src}`}
    //             alt={image?.alt}
    //             width={600}
    //             height={300}
    //         />
    //     </div>
    // );

    const Paragraph = (paragraph) => {
        const { node, children } = paragraph;

        if (node.children[0]?.tagName === 'img') {
            const image = node.children[0].properties;

            return (
                <div className={classes.image}>
                    <Image
                        src={`/images/posts/${post.slug}/${image.src}`}
                        alt={image.alt}
                        width={600}
                        height={300}
                    />
                </div>
            );
        }

        return <p>{children}</p>;
    };

    const CodeBlock = (code) => {
        const { node, children } = code;

        const language = node.properties.className[0].split('-')[1];

        return (
            <SyntaxHighlighter style={atomDark} language={language}>
                {children}
            </SyntaxHighlighter>
        );
    };

    const components = {
        p: Paragraph,
        code: CodeBlock,
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={components}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
}

export default PostContent;

//############# Type ##################

type Props = {
    post: Post;
};

interface Post {
    title: string;
    slug: string;
    image: string;
    content: string;
}
