import { fetchServer } from '@/lib/fetch';
import { ServerDetail } from '@/components/ServerDetail/ServerDetail';
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
        description: `See live details for ${server.name}: current map, player list with score, kills, and deaths. Get the IP, join the server, and access its website and Discord.`,
    };
}

export default async function ServerPage({ params }: Props) {
    const { id } = await params;
    const [ ip, port ] = decodeURIComponent(id).split(':');

    // Need to fetch the server for the metadata anyway,
    // so we might as well use the data to initially populate the page
    const server = await fetchServer(ip, port);

    return (
        <>
            <ServerDetail initial={server}/>
        </>
    );
}
