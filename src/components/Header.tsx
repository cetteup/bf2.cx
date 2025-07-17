'use client';

import {
    Badge,
    Button,
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
import { BuddyList } from '@/components/BuddyList';
import { useState } from 'react';

export default function Header() {
    const path = usePathname();
    const [ onlineBuddyCount, setOnlineBuddyCount ] = useState(0);
    const [ showBuddyList, setShowBuddyList ] = useState(false);

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
                        <Nav>
                            <NavLink as={Link} href={'/'} active={path == '/'}>Serverlist</NavLink>
                            <NavLink as={Link} href={'/faq'} active={path == '/faq'}>FAQ</NavLink>
                        </Nav>
                    </NavbarCollapse>
                    <NavbarText>
                        <IconLink icon={'bi-discord'} href={'https://discord.gg/fq7c46prEX'} title={'Discord'}/>
                        <IconLink icon={'bi-github'} href={'https://github.com/cetteup/bf2.cx'} title={'GitHub'}/>
                        <Button
                            variant={'outline-light'}
                            onClick={() => setShowBuddyList(true)}
                            className={'ms-3'}
                            data-umami-event={'view-buddies'}
                        >
                            Buddies
                            {onlineBuddyCount > 0 &&
                                <Badge bg={'success'} className={'ms-1 buddy'}>{onlineBuddyCount} online</Badge>
                            }
                        </Button>
                    </NavbarText>
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
