'use client';

import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'react-bootstrap';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const activeSegment = useSelectedLayoutSegment();

    return (
        <header>
            <Navbar bg={'dark'} data-bs-theme={'dark'}>
                <Container>
                    <NavbarBrand href={'/'}>BF2.CX</NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav"/>
                    <NavbarCollapse>
                        <Nav className="me-auto">
                            <Link href={'/'} className={'nav-link ' + (activeSegment == null ? 'active' : '')}>Serverlist</Link>
                            <Link href={'/faq'} className={'nav-link ' + (activeSegment == 'faq' ? 'active' : '')}>FAQ</Link>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
}
