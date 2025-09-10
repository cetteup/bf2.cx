'use client';

import {
    Badge,
    Button,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
    NavLink,
} from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconLink } from '@/components/IconLink';
import Image from 'next/image';
import { BuddyList } from '@/components/BuddyList';
import { useState } from 'react';
import { useTracking } from '@/lib/hooks';

export default function Header() {
    const path = usePathname();
    const { trackEvent } = useTracking();
    const [ onlineBuddyCount, setOnlineBuddyCount ] = useState(0);
    const [ showBuddyList, setShowBuddyList ] = useState(false);

    return (
        <header>
            <Navbar expand={'lg'} bg={'dark'} data-bs-theme={'dark'}>
                <Container>
                    <NavbarBrand as={Link} href={'/'} className={'order-first'}>
                        <Image
                            src={'/bf2.cx.png'}
                            width={24}
                            height={24}
                            quality={100}
                            className={'d-inline-block align-text-bottom'}
                            alt={'BF2.CX'}
                        /> BF2.CX
                    </NavbarBrand>
                    <Nav className={'ms-auto me-2 me-lg-0 order-2 order-lg-1'}>
                        <Button
                            variant={'outline-light'}
                            onClick={() => {
                                setShowBuddyList(true);
                                trackEvent('view-buddies');
                            }}
                            className={'ms-3'}
                        >
                            Buddies
                            {onlineBuddyCount > 0 &&
                                <Badge bg={'success'} className={'ms-1 buddy'}>{onlineBuddyCount} online</Badge>
                            }
                        </Button>
                    </Nav>
                    <NavbarToggle className={'order-4'} aria-controls={'nav-links'}/>
                    <NavbarCollapse id={'nav-links'} className={'order-last order-lg-first mb-1 mb-lg-0'}>
                        <Nav>
                            <NavLink as={Link} href={'/'} active={path == '/'}>Serverlist</NavLink>
                            <NavLink as={Link} href={'/faq'} active={path == '/faq'}>FAQ</NavLink>
                        </Nav>
                        <Nav className={'ms-auto flex-row order-3'}>
                            <IconLink
                                icon={'bi-discord'}
                                href={'https://discord.gg/fq7c46prEX'}
                                title={'Discord'}
                                className={'me-3 mx-lg-3'}
                            />
                            <IconLink
                                icon={'bi-github'}
                                href={'https://github.com/cetteup/bf2.cx'}
                                title={'GitHub'}
                                className={'me-3 mx-lg-2'}
                            />
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <BuddyList
                show={showBuddyList}
                onHide={() => setShowBuddyList(false)}
                setOnline={setOnlineBuddyCount}
            />
        </header>
    );
}
