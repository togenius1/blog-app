import { Fragment, ReactNode } from 'react';

import MainNavigation from './main-navigation';

function Layout(props: Props) {
    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
        </Fragment>
    );
}

export default Layout;

//##################### Type ########################
type Props = {
    children: ReactNode;
};
