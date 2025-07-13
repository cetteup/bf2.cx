'use client';

import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchServer } from '@/lib/fetch';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { ServerDetailPlayerTable } from '@/components/ServerDetail/ServerDetailPlayerTable';
import { determineProvider, formatProvider, isHumanPlayer, isValidURL } from '@/lib/utils';
import Image from 'next/image';

type ServerDetailProps = {
    ip: string
    port: string
}

export const ServerDetail: FC<ServerDetailProps> = ({ ip, port }) => {
    const { data: server } = useSuspenseQuery({
        queryKey: [ 'servers', ip, port ],
        queryFn: () => fetchServer(ip, port),
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        retry: 2,
    });

    const [ provider ] = determineProvider(server);

    return (
        <>
            <Container>
                <h1 className={'display-5 text-truncate'}>{server.name}</h1>
                <h3>
                    <Row className={'align-items-center align-content-center gx-3 gy-3'}>
                        {provider == 'bf2hub.com' &&
                            <Col xs={'auto'}>
                                <Image
                                    src={`/${provider}-lg.png`}
                                    width={82}
                                    height={28}
                                    quality={100}
                                    className={'align-middle'}
                                    style={{ marginBottom: '3px' }}
                                    alt={formatProvider(provider)}
                                />
                            </Col>
                        }
                        {provider && provider != 'bf2hub.com' &&
                            <Col xs={'auto'}>
                                <Image
                                    src={`/${provider}-lg.png`}
                                    width={36}
                                    height={36}
                                    quality={100}
                                    className={'align-middle'}
                                    style={{ marginBottom: '2px' }}
                                    alt={formatProvider(provider)}
                                />
                            </Col>
                        }
                        {server.joinLink && (
                            <Col xs={'auto'}>
                                <a href={server.joinLink}>
                                    <i
                                        className={'bi-play-circle text-white'}
                                        title={'Join server'}
                                    />
                                </a>
                            </Col>
                        )}
                        {isValidURL(server.demoIndex, 'http:', 'https:') && (
                            <Col xs={'auto'}>
                                <a href={server.demoIndex}>
                                    <i
                                        className={'bi-film text-white'}
                                        title={'Browse demo index'}
                                    />
                                </a>
                            </Col>
                        )}
                        {isValidURL(server.variables['website'], 'http:', 'https:') && (
                            <Col xs={'auto'}>
                                <a href={server.variables['website']}>
                                    <i
                                        className={'bi-link-45deg text-white'}
                                        title={'Visit website'}
                                    />
                                </a>
                            </Col>
                        )}
                        {isValidURL(server.variables['discord'], 'http:', 'https:') && (
                            <Col xs={'auto'}>
                                <a href={server.variables['discord']} className={'align-middle'}>
                                    <i
                                        className={'bi-discord text-white'}
                                        title={'Join Discord'}
                                    />
                                </a>
                            </Col>
                        )}
                        <Col xs={'auto'}>
                            <Badge bg={'primary'}>
                                <i className={'bi-server'}/> {server.ip}:{server.port}
                            </Badge>
                        </Col>
                        <Col xs={'auto'}>
                            <Badge bg={'success'}>
                                <i className={'bi-map'}/> {server.mapName} ({server.mapSize})
                            </Badge>
                        </Col>
                        {server.noVehicles &&
                            <Col xs={'auto'}>
                                <Badge bg={'secondary'}>No vehicles</Badge>
                            </Col>
                        }
                    </Row>
                </h3>
            </Container>

            <Container className={'mt-3'}>
                <Row>
                    {server.teams.map((t) => (
                        <Col key={t.index}>
                            <ServerDetailPlayerTable
                                team={t}
                                players={
                                    server.players
                                        .filter((p) => isHumanPlayer(p) && p.team == t.index)
                                }
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};
