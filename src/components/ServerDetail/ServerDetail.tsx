'use client';

import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { ServerDetailPlayerTable } from '@/components/ServerDetail/ServerDetailPlayerTable';
import { determineProvider, formatProvider, isHumanPlayer, isValidURL } from '@/lib/utils';
import Image from 'next/image';
import { SettingToggle } from '@/components/ServerDetail/SettingToggle';

type ServerDetailProps = {
    ip: string
    port: string
}

export const ServerDetail: FC<ServerDetailProps> = ({ ip, port }) => {
    const { data: servers } = useSuspenseQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        retry: 2,
    });

    // TODO Handle not found
    const server = servers.find((s) => s.ip == ip && s.port.toString() == port)!;

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
                    </Row>
                </h3>
            </Container>

            <Container>
                {/*<FormCheck type={'switch'} label={'Battlerecorder'} readOnly checked={server.battlerecorder}/>*/}
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
