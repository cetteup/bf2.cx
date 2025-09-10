'use client';

import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchServer } from '@/lib/fetch';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { ServerDetailPlayerTable } from '@/components/ServerDetail/ServerDetailPlayerTable';
import { determineProvider, formatProvider, isHumanPlayer, isValidURL } from '@/lib/utils';
import Image from 'next/image';
import { SettingToggle } from '@/components/ServerDetail/SettingToggle';
import { Server } from '@/lib/types';
import { notFound } from 'next/navigation';
import { ExternalLink } from '@/components/ExternalLink';
import { useTracking } from '@/lib/hooks';

type ServerDetailProps = {
    initial: Server
}

export const ServerDetail: FC<ServerDetailProps> = ({ initial }) => {
    const { trackEvent } = useTracking();

    const { ip, port } = initial;
    const { data: server } = useSuspenseQuery({
        queryKey: [ 'servers', ip, port ],
        queryFn: () => fetchServer(ip, port.toString()),
        initialData: initial,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 2,
    });

    if (!server) {
        notFound();
    }

    const [ provider ] = determineProvider(server);

    return (
        <>
            <Container>
                <h1 className={'display-5 text-truncate'}>
                    {server.password &&
                        <i
                            className={'bi-lock fs-1 me-2 text-white-50 align-baseline'}
                            title={'Password protected'}
                        />
                    }
                    {server.name}
                </h1>
                <h3>
                    <Row className={'align-items-center align-content-center gx-3 gy-3'}>
                        {provider &&
                            <Col xs={'auto'}>
                                <Image
                                    src={`/${provider}.png`}
                                    width={36}
                                    height={36}
                                    quality={100}
                                    className={'align-middle'}
                                    style={{ marginBottom: '2px' }}
                                    alt={formatProvider(provider)}
                                    title={'Uses ' + formatProvider(provider)}
                                />
                            </Col>
                        }
                        {server.joinLink && (
                            <Col xs={'auto'}>
                                <a
                                    href={server.joinLink}
                                    onClick={() => trackEvent('join-server')}
                                >
                                    <i
                                        className={'bi-play-circle text-white'}
                                        title={'Join server'}
                                    />
                                </a>
                            </Col>
                        )}
                        {isValidURL(server.demoIndex, 'http:', 'https:') && (
                            <Col xs={'auto'}>
                                <ExternalLink
                                    href={server.demoIndex}
                                    onClick={() => trackEvent('browse-demos')}
                                >
                                    <i
                                        className={'bi-film text-white'}
                                        title={'Browse demo index'}
                                    />
                                </ExternalLink>
                            </Col>
                        )}
                        {isValidURL(server.variables['website'], 'http:', 'https:') && (
                            <Col xs={'auto'}>
                                <ExternalLink
                                    href={server.variables['website']}
                                    onClick={() => trackEvent('visit-website')}
                                >
                                    <i
                                        className={'bi-link-45deg text-white'}
                                        title={'Visit website'}
                                    />
                                </ExternalLink>
                            </Col>
                        )}
                        {isValidURL(server.variables['discord'], 'http:', 'https:') && (
                            <Col xs={'auto'}>
                                <ExternalLink
                                    href={server.variables['discord']}
                                    onClick={() => trackEvent('join-discord')}
                                >
                                    <i
                                        className={'bi-discord text-white'}
                                        title={'Join Discord'}
                                    />
                                </ExternalLink>
                            </Col>
                        )}
                        {isValidURL(server.variables['teamspeak'], 'http:', 'https:', 'ts3server:', 'teamspeak:') && (
                            <Col xs={'auto'}>
                                <ExternalLink
                                    href={server.variables['teamspeak']}
                                    onClick={() => trackEvent('join-teamspeak')}
                                >
                                    <Image
                                        src={'/teamspeak.png'}
                                        width={28}
                                        height={28}
                                        style={{
                                            width: '1.75rem',
                                            height: '1.75rem',
                                            verticalAlign: '-0.225rem',
                                        }}
                                        alt={'TeamSpeak'}
                                        title={'Join TeamSpeak'}
                                    />
                                </ExternalLink>
                            </Col>
                        )}
                        <Col xs={'auto'}>
                            <Badge bg={'primary'}>
                                <i className={'bi-activity'}/> {server.players.filter(isHumanPlayer).length} / {server.maxPlayers}
                            </Badge>
                        </Col>
                        <Col xs={'auto'}>
                            <Badge bg={'success'}>
                                <i className={'bi-map'}/> {server.mapName} ({server.mapSize})
                            </Badge>
                        </Col>
                        <Col xs={'auto'}>
                            <Badge bg={'light-subtle'}>
                                <i className={'bi-server'}/> {server.ip}:{server.port}
                            </Badge>
                        </Col>
                    </Row>
                </h3>
            </Container>

            <Container>
                <h5>
                    <Row className={'gx-3'}>
                        <Col xs={'auto'}><SettingToggle enabled={server.ranked} label={'Ranked'}/></Col>
                        <Col xs={'auto'}><SettingToggle enabled={!server.noVehicles} label={'Vehicles'}/></Col>
                        <Col xs={'auto'}><SettingToggle enabled={server.battlerecorder} label={'Battlerecorder'}/></Col>
                        <Col xs={'auto'}><SettingToggle enabled={server.voip} label={'VOIP'}/></Col>
                        <Col xs={'auto'}><SettingToggle enabled={server.friendlyfire} label={'Friendly fire'}/></Col>
                        <Col xs={'auto'}><SettingToggle enabled={server.autobalance} label={'Autobalance'}/></Col>
                    </Row>
                </h5>
            </Container>

            <Container className={'mt-3'}>
                <Row>
                    {server.teams.map((t) => (
                        <Col key={t.index}>
                            <ServerDetailPlayerTable
                                team={t}
                                players={
                                    server.players
                                        .filter((p) => (isHumanPlayer(p) || p.aibot) && p.team == t.index)
                                }
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};
