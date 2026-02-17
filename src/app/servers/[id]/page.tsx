import { fetchServer } from '@/lib/fetch';
import { ServerDetail } from '@/components/ServerDetail/ServerDetail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Alert, AlertHeading, AlertLink } from 'react-bootstrap';

export const runtime = 'edge';

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const [ ip, port ] = decodeURIComponent(id).split(':');

    const server = await fetchServer(ip, port);

    if (!server) {
        return {
            title: 'Server not found - BF2.CX',
            description: 'See live details for any server: current map, player list with score, kills, and deaths. Get the IP, join the server, and access its website and Discord.',
        };
    }

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

    if (!server) {
        notFound();
    }

    return (
        <>
            {server.name == 'China #1 standalone server' &&
                <Alert variant={'warning'} dismissible>
                    <AlertHeading>
                        <i className={'bi-exclamation-diamond-fill me-2'}/> If you are the admin of this
                        server and/or the gameppy.com <q>master</q> server,
                        please note
                    </AlertHeading>
                    gameppy.com is using the same player id range as BF2Hub, causing gameppy.com
                    players to be <i>banned</i> on BF2Hub servers. If possible, please switch to a unique player id
                    range (e.g. starting with 510000000 instead of 500000000) and migrate existing players.
                    For details, feel free to reach out via <AlertLink href={'https://discord.gg/fq7c46prEX'}
                                                               rel={'noreferrer'}>Discord</AlertLink>, <AlertLink
                    href={'https://hostux.social/@cetteup'} rel={'noreferrer'}>Mastodon</AlertLink> or <AlertLink
                    href={'mailto:me@cetteup.com'} rel={'noreferrer'}>email</AlertLink>.
                </Alert>
            }
            <ServerDetail initial={server}/>
        </>
    );
}
