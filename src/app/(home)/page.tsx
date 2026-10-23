import { getQueryClient } from '@/lib/query';
import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { ServerList } from '@/components/ServerList/ServerList';
import type { Metadata } from 'next';
import { PersistedAlert } from '@/components/PersistedAlert';

// Disable ISR (server list is too dynamic to cache at build time and revalidate)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'BF2.CX - Browse Battlefield 2 servers',
    description: 'Discover active Battlefield 2 servers with real player counts - no fake bots. Join games directly, and access each server’s website, Discord, and TeamSpeak links instantly.',
};

export default async function Home() {
    const queryClient = getQueryClient();

    await queryClient
        .query({
            queryKey: [ 'servers' ],
            queryFn: fetchServers,
            retry: 2,
        })
        .catch(noop);

    return (
        <>
            <h1 className={'display-4'}>Browse Battlefield 2 servers</h1>
            <PersistedAlert alertKey={'home-automatic-server-list-update'} variant={'info'} className={'alert-enter'}>
                <i className={'bi-info-circle-fill me-2'}/>
                The server list self-updates, no need to refresh the page or press any buttons!
            </PersistedAlert>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ServerList/>
            </HydrationBoundary>
        </>
    );
}
