'use client';

import { Alert, Placeholder } from 'react-bootstrap';
import type { Metadata } from 'next';
import { ServerListTable } from '@/components/ServerList/ServerListTable';

export const metadata: Metadata = {
    title: 'BF2.CX - Browse Battlefield 2 servers',
    description: 'Discover active Battlefield 2 servers with real player counts - no fake bots. Join games directly, and access each server’s website, Discord, and TeamSpeak links instantly.',
};

export default function Loading() {
    return (
        <>
            <h1 className={'display-4'}>Browse Battlefield 2 servers</h1>
            <Alert variant={'info'} dismissible>
                <i className={'bi-info-circle-fill me-2'}/>
                The server list self-updates, no need to refresh the page or press any buttons!
            </Alert>
            <p aria-hidden={true}>
                <Placeholder xs={6}/>
            </p>
            <ServerListTable placeholders={10}/>
        </>
    );
}
