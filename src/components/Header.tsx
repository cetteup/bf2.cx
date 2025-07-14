'use client';

import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const path = usePathname()

    return (
        <header>
            <Navbar bg={'dark'} data-bs-theme={'dark'}>
                <Container>
                    <NavbarBrand as={Link} href={'/'}>BF2.CX</NavbarBrand>
                    <NavbarToggle aria-controls={'basic-navbar-nav'}/>
                    <NavbarCollapse>
                        <Nav className={'me-auto'}>
                            <NavLink as={Link} href={'/'} active={path == '/'}>Serverlist</NavLink>
                            <NavLink as={Link} href={'/faq'} active={path == '/faq'}>FAQ</NavLink>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
}
