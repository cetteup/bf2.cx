import { fetchServer } from '@/lib/fetch';
import { ServerDetail } from '@/components/ServerDetail/ServerDetail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlertHeading, AlertLink } from 'react-bootstrap';
import { PersistedAlert } from '@/components/PersistedAlert';
import { isEmpty } from '@/lib/utils';

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
            {isEmpty(server.variables) &&
                <PersistedAlert alertKey={'server-add-variables'} variant={'dark'} className={'alert-enter'}>
                    <AlertHeading>
                        <i className={'bi-info-square-fill me-1'}/> Is this your server? Add some variables!
                    </AlertHeading>
                    Use sponsortext variables to add your website, Discord, TeamSpeak and other details to your server.
                    For details, see the <AlertLink href={'/faq#adding-server-links'}>FAQ</AlertLink> or visit <AlertLink href={'https://sponsortext.cetteup.com/'} rel={'noreferrer'}>sponsortext.cetteup.com</AlertLink>.
                </PersistedAlert>
            }
            <ServerDetail ip={ip} port={port} initial={server}/>
        </>
    );
}
