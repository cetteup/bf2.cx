import { FC } from 'react';
import { determineProvider, formatProvider, isHumanPlayer, isValidURL } from '@/lib/utils';
import Image from 'next/image';
import { Server } from '@/lib/types';
import { HoverPrefetchLink } from '@/components/HoverPrefetchLink';
import { ExternalLink } from '@/components/ExternalLink';

type ServerListEntryProps = {
    server: Server
}

export const ServerListTableRow: FC<ServerListEntryProps> = ({ server }) => {
    const [ provider, explicit ] = determineProvider(server);

    return (
        <tr>
            <td className={'align-middle'}>
                <span className={'me-2'}>
                {server.ranked ? (
                    <Image
                        src={'/ranked.svg'}
                        width={16}
                        height={16}
                        style={{
                            width: '12pt',
                            height: '12pt',
                            verticalAlign: '-0.125rem',
                        }}
                        alt={'Ranked'}
                        title={'Ranked'}
                    />
                ) : (
                    <Image
                        src={'/unranked.svg'}
                        width={16}
                        height={16}
                        style={{
                            width: '12pt',
                            height: '12pt',
                            verticalAlign: '-0.125rem',
                        }}
                        alt={'Unranked'}
                        title={'Unranked'}
                    />
                )}
                </span>
                <span className={'me-2'}>
                {server.battlerecorder ? (
                    <i
                        className={'bi-camera-video text-white'}
                        title={'Battlerecorder enabled'}
                    />
                ) : (
                    <i
                        className={'bi-camera-video-off text-white-50'}
                        title={'Battlerecorder disabled'}
                    />
                )}
                </span>
                <span className={'me-2'}>
                {server.password ? (
                    <i
                        className={'bi-lock text-white-50'}
                        title={'Password protected'}
                    />
                ) : (
                    <i
                        className={'bi-unlock text-white'}
                        title={'No password'}
                    />
                )}
                </span>
                {server.voip ? (
                    <i
                        className={'bi-headset text-white'}
                        title={'VOIP enabled'}
                    />
                ) : (
                    <i
                        className={'bi-headphones text-white-50'}
                        title={'No VOIP'}
                    />
                )}
            </td>
            <td>
                {provider && (
                    <span>
                        <Image
                            src={`/${provider}.png`}
                            width={16}
                            height={16}
                            style={{
                                marginTop: '-3px',
                                opacity: explicit ? '100%' : '60%',
                            }}
                            alt={formatProvider(provider)}
                            title={'Uses ' + formatProvider(provider)}
                        />
                    </span>
                )}
            </td>
            <td className={'align-middle'}>
                <HoverPrefetchLink href={`/servers/${server.ip}:${server.port}`} className={'text-white text-decoration-none'}>
                    {server.name}
                </HoverPrefetchLink>
            </td>
            <td align={'right'}>{server.players.filter(isHumanPlayer).length} / {server.maxPlayers}</td>
            <td>{server.mapName} ({server.mapSize})</td>
            <td>
                {server.joinLink && (
                    <span className={'me-1'}>
                        <a href={server.joinLink} data-umami-event={'join-server'}>
                            <i
                                className={'bi-play-circle text-white'}
                                title={'Join server'}
                            />
                        </a>
                    </span>
                )}
                {isValidURL(server.demoIndex, 'http:', 'https:') && (
                    <span className={'me-1'}>
                        <ExternalLink href={server.demoIndex} data-umami-event={'browse-demos'}>
                            <i
                                className={'bi-film text-white'}
                                title={'Browse demo index'}
                            />
                        </ExternalLink>
                    </span>
                )}
                {isValidURL(server.variables['website'], 'http:', 'https:') && (
                    <span className={'me-1'}>
                        <ExternalLink href={server.variables['website']} data-umami-event={'visit-website'}>
                            <i
                                className={'bi-link-45deg text-white'}
                                title={'Visit website'}
                            />
                        </ExternalLink>
                    </span>
                )}
                {isValidURL(server.variables['discord'], 'http:', 'https:') && (
                    <span className={'me-1'}>
                        <ExternalLink href={server.variables['discord']} data-umami-event={'join-discord'}>
                            <i
                                className={'bi-discord text-white'}
                                title={'Join Discord'}
                            />
                        </ExternalLink>
                    </span>
                )}
                {isValidURL(server.variables['teamspeak'], 'http:', 'https:', 'ts3server:', 'teamspeak:') && (
                    <span className={'me-1'}>
                        <ExternalLink href={server.variables['teamspeak']} data-umami-event={'join-teamspeak'}>
                            <Image
                                src={'/teamspeak.png'}
                                width={16}
                                height={16}
                                style={{
                                    width: '12pt',
                                    height: '12pt',
                                    verticalAlign: '-0.125rem',
                                }}
                                alt={'TeamSpeak'}
                                title={'Join TeamSpeak'}
                            />
                        </ExternalLink>
                    </span>
                )}
            </td>
        </tr>
    );
};
