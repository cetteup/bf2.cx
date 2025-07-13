import { getQueryClient } from '@/lib/query';
import { fetchServers } from '@/lib/fetch';
import { ServerDetail } from '@/components/ServerDetail/ServerDetail';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const runtime = 'edge';

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const [ ip, port ] = decodeURIComponent(id).split(':');

    const servers = await fetchServers();
    // TODO handle not found
    const server = servers.find((s) => s.ip == ip && s.port.toString() == port)!;

    return {
        title: `${server.name} - BF2.CX`,
    };
}

export default async function ServerPage({ params }: Props) {
    const { id } = await params;
    const [ ip, port ] = decodeURIComponent(id).split(':');

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        retry: 2,
    });

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ServerDetail ip={ip} port={port}/>
            </HydrationBoundary>
        </>
    );
}
