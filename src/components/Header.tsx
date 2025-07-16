'use client';

import {
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarText,
    NavbarToggle,
    NavLink,
} from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconLink } from '@/components/IconLink';
import Image from 'next/image';

export default function Header() {
    const path = usePathname()

    return (
        <header>
            <Navbar bg={'dark'} data-bs-theme={'dark'}>
                <Container>
                    <NavbarBrand as={Link} href={'/'}>
                        <Image
                            src={'/bf2.cx.png'}
                            width={24}
                            height={24}
                            quality={100}
                            className={'d-inline-block align-text-bottom'}
                            alt={'BF2.CX'}
                        /> BF2.CX
                    </NavbarBrand>
                    <NavbarToggle aria-controls={'basic-navbar-nav'}/>
                    <NavbarCollapse>
                        <Nav className={'me-auto'}>
                            <NavLink as={Link} href={'/'} active={path == '/'}>Home</NavLink>
                            <NavLink as={Link} href={'/servers'} active={path == '/servers'}>Servers</NavLink>
                            <NavLink as={Link} href={'/faq'} active={path == '/faq'}>FAQ</NavLink>
                        </Nav>
                    </NavbarCollapse>
                    <NavbarText>
                        <IconLink icon={'bi-discord'} href={'https://discord.gg/fq7c46prEX'} title={'Discord'}/>
                        <IconLink icon={'bi-github'} href={'https://github.com/cetteup/bf2.cx'} title={'GitHub'}/>
                    </NavbarText>
                </Container>
            </Navbar>
        </header>
    );
}
