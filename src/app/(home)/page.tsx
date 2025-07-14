import { getQueryClient } from '@/lib/query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { ServerList } from '@/components/ServerList/ServerList';
import type { Metadata } from 'next';
import { Alert } from 'react-bootstrap';

// Disable ISR (server list is too dynamic to cache at build time and revalidate)
export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'BF2.CX - Browse Battlefield 2 servers',
    description: 'Discover active Battlefield 2 servers with real player counts - no fake bots. Join games directly, and access each server’s website, Discord, and TeamSpeak links instantly.',
};

export default async function Home() {
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        retry: 2,
    });

    return (
        <>
            <h1 className={'display-4'}>Browse Battlefield 2 servers</h1>
            <Alert variant={'info'} dismissible>
                <i className={'bi-info-circle-fill me-2'}/>
                The server list self-updates, no need to refresh the page or press any buttons!
            </Alert>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ServerList/>
            </HydrationBoundary>
        </>
    );
}
