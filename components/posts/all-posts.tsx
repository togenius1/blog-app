import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

function AllPosts(props: Props) {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={props.posts} />
        </section>
    );
}

export default AllPosts;

//##################### Type ####################
type Props = {
    posts: any[];
};
