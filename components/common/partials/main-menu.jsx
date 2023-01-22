import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import { mainMenu } from '~/utils/data/menu';

function MainMenu() {
    const pathname = useRouter().pathname;

    return (
        <nav className="main-nav">
            <ul className="menu">
                <li id="menu-home" className={pathname === '/' ? 'active' : ''}>
                    <ALink href='/'>Home</ALink>
                </li>

                <li className={`${pathname.includes('/shop?category=active') ? 'active' : ''}`}>
                    <ALink href='/shop?category=nutrition-and-health'>Nutrition & Health</ALink>
                </li>

                <li className={`${pathname.includes('/shop?category=gut-health') ? 'active' : ''}`}>
                    <ALink href='/shop?category=gut-health'>Gut Health</ALink>
                </li>

                <li className={`${pathname.includes('/shop/category=specialty-supplements') ? 'active' : ''}`}>
                    <ALink href='/shop?category=specialty-supplements'>Special Supplements</ALink>
                </li>

                <li>
                    <ALink href="/contact">Contact</ALink>
                </li>
            </ul>
        </nav>
    )
}

export default MainMenu;