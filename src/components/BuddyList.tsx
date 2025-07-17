'use client';

import { FC, useEffect } from 'react';
import {
    Badge,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    OffcanvasTitle,
} from 'react-bootstrap';
import { useBuddyList } from '@/lib/localstorage';
import { BuddyToggle } from '@/components/BuddyToggle';
import { formatPlayerName, isHumanPlayer } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import Link from 'next/link';
import { getActiveStreamerByPlayer } from '@/lib/streamers';

type BuddyListProps = {
    show: boolean
    onHide: () => void
    setOnline: (count: number) => void
}

export const BuddyList: FC<BuddyListProps> = ({ show, onHide, setOnline }) => {
    const { value: buddies } = useBuddyList();
    const { data: servers } = useSuspenseQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 2,
    });

    const joined = buddies
        .map((b) => ({
            ...b,
            server: servers.find((s) => s.players.some((p) => p.pid == b.pid)),
        }))
        .sort((a, b) => {
            if (!a.server && b.server) {
                return 1;
            }
            if (a.server && !b.server) {
                return -1;
            }
            return a.name.localeCompare(b.name);
        });

    useEffect(() => {
        setOnline(joined.filter((e) => !!e.server).length);
    }, [ joined, setOnline ]);

    return (
        <Offcanvas show={show} onHide={onHide} placement={'end'} data-bs-theme={'dark'}>
            <OffcanvasHeader closeButton>
                <OffcanvasTitle>Buddies</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
                {joined.length == 0 &&
                    <p>
                        You don&lsquo;t have any buddies yet.
                        Add buddies by clicking <i className={'bi-person-plus-fill'}/> in the player list of a server.
                    </p>
                }
                {joined.length > 0 && joined.map(({ server, ...b }) => {
                    const streamer = getActiveStreamerByPlayer(b);
                    return (
                        <Card key={b.pid} className={'my-2'}>
                            <CardBody>
                                <CardTitle className={server ? undefined : 'my-0'}>
                                    <span className={'me-1 ' + (server ? '' : 'text-white-50')}>
                                        {formatPlayerName(b)}
                                    </span>
                                    {streamer && (
                                        <span className={'mx-1'}>
                                            <a href={streamer.url} data-umami-event={'watch-stream'}>
                                                <i
                                                    className={`bi-${streamer.platform} align-middle`}
                                                    title={'Watch live-stream'}
                                                />
                                            </a>
                                        </span>
                                    )}
                                    <BuddyToggle pid={b.pid} name={b.name} tag={b.tag}/>
                                </CardTitle>
                                {server &&
                                    <CardText as={'div'}>
                                        <p className={'text-truncate my-2'}>
                                            <Link
                                                href={`/servers/${server.ip}:${server.port}`}
                                                className={'text-white text-decoration-none'}
                                            >
                                                {server.name}
                                            </Link>
                                        </p>
                                        <div style={{ lineHeight: '1.1' }}>
                                            {server.joinLink &&
                                                <a
                                                    href={server.joinLink}
                                                    className={'me-1 fs-4 align-middle'}
                                                    data-umami-event={'join-buddy'}
                                                >
                                                    <i
                                                        className={'bi-play-circle text-white'}
                                                        title={'Join server'}
                                                    />
                                                </a>
                                            }
                                            <Badge className={'me-1 bg-light-subtle fs-6'}>
                                                <i
                                                    className={'bi-activity'}
                                                /> {server.players.filter(isHumanPlayer).length} / {server.maxPlayers}
                                            </Badge>
                                            <Badge bg={'success'} className={'fs-6'}>
                                                <i
                                                    className={'bi-map'}
                                                /> <span
                                                className={'text-truncate d-inline-block align-bottom'}
                                                style={{ maxWidth: '180px' }}>
                                                {server.mapName}
                                                </span> ({server.mapSize})
                                            </Badge>
                                        </div>
                                    </CardText>
                                }
                            </CardBody>
                        </Card>
                    );
                })}
            </OffcanvasBody>
        </Offcanvas>
    );
};
