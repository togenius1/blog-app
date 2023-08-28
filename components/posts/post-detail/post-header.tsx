import Image from 'next/image';

import classes from './post-header.module.css';

function PostHeader(props: Props) {
    const { title, image } = props;

    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            <Image src={image} alt={title} width={200} height={200} />
        </header>
    );
}

export default PostHeader;

//############ Type ##############
type Props = {
    title: string;
    image: string;
};