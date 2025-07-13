import { getQueryClient } from '@/lib/query';
import { fetchServer } from '@/lib/fetch';
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

    const server = await fetchServer(ip, port);
    return {
        title: `${server.name} - BF2.CX`,
    };
}

export default async function ServerPage({ params }: Props) {
    const { id } = await params;
    const [ ip, port ] = decodeURIComponent(id).split(':');

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery({
        queryKey: [ 'servers', ip, port ],
        queryFn: () => fetchServer(ip, port),
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
