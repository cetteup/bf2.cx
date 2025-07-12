import { getQueryClient } from '@/lib/query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { ServerList } from '@/components/ServerList/ServerList';
import type { Metadata } from 'next';

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
            <div>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ServerList/>
                </HydrationBoundary>
            </div>
        </>
    );
}
