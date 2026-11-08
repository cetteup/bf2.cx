import { FC } from 'react';
import { Player, Team } from '@/lib/types';
import { Placeholder, Table } from 'react-bootstrap';
import { buildPlayerProfileURL, formatPlayerName, formatTeamLabel, isAIBot } from '@/lib/utils';
import { getActiveStreamerByPlayer } from '@/lib/streamers';
import { BuddyToggle } from '@/components/BuddyToggle';
import { useTracking } from '@/lib/hooks';

type ServerDetailPlayerTableProps = {
    gameVariant?: string
    team?: Team
    players?: Player[]
    isLoading?: boolean
}

export const ServerDetailPlayerTable: FC<ServerDetailPlayerTableProps> = ({ gameVariant, team, players, isLoading }) => {
    const { trackEvent } = useTracking();

    return (
        <>
            <div className={'pe-auto my-2'}>
                <h3 className={'text-center bg-dark-subtle py-3'}>
                    {isLoading && <Placeholder xs={2} size={'lg'}></Placeholder>}
                    {gameVariant && team && formatTeamLabel(gameVariant, team.label)}
                </h3>
            </div>
            <Table variant={'dark'} hover responsive className={'align-middle'}>
                <thead>
                <tr>
                    <th className={'col text-end'}></th>
                    <th className={'col'}>Name</th>
                    <th className={'col text-end'}>Score</th>
                    <th className={'col text-end'}>Kills</th>
                    <th className={'col text-end'}>Deaths</th>
                    <th className={'col text-end'}>Ping</th>
                </tr>
                </thead>
                <tbody>
                {isLoading && [ ...Array(20).keys() ].map((i) => (
                    <tr key={i}>
                        {[ ...Array(6).keys() ].map((j) => (
                            <td key={j}>
                                <Placeholder as={'span'} animation={'glow'}>
                                    <Placeholder xs={12}/>
                                </Placeholder>
                            </td>
                        ))}
                    </tr>
                ))}
                {players && players.sort(compare).map((p, i) => {
                    // Show a stream platform link if player is known streamer (and currently [likely to be] live)
                    const streamer = getActiveStreamerByPlayer(p);
                    return (
                        <tr key={i} className={'align-middle ' + (isAIBot(p) ? 'bot' : 'player')}>
                            <td align={'right'}>{i + 1}</td>
                            <td>
                                {!isAIBot(p) ? (
                                    <a href={buildPlayerProfileURL(p)}
                                       className={'text-white text-decoration-none'}>
                                        {formatPlayerName(p)}
                                    </a>
                                ) : (
                                    <>
                                        <span className={'me-1'}>
                                            <i className={'bi-pc-display align-middle'} title={'Coop-bot'}/>
                                        </span>
                                        {formatPlayerName(p)}
                                    </>
                                )}
                                {streamer && (
                                    <span className={'ms-1'}>
                                    <a
                                        href={streamer.url}
                                        onClick={() => trackEvent('watch-stream', {
                                            streamer: streamer?.name,
                                            stream: streamer?.url,
                                        })}
                                    >
                                        <i
                                            className={`bi-${streamer.platform} align-middle`}
                                            title={'Watch live-stream'}
                                        />
                                    </a>
                                </span>
                                )}
                                {!isAIBot(p) && (
                                    <span className={'ms-1'}>
                                    <BuddyToggle pid={p.pid} name={p.name} tag={p.tag}/>
                                </span>
                                )}
                            </td>
                            <td align={'right'}>{p.score}</td>
                            <td align={'right'}>{p.kills}</td>
                            <td align={'right'}>{p.deaths}</td>
                            {/*
                                Show any non-zero ping for bogus AI bots (isAIBot == true but p.aibot == false).
                                These bots do have real pings it allows users to tell true from bogus AI bots.
                            */}
                            <td align={'right'}>{p.ping == 0 || p.aibot ? '-' : p.ping + 'ms'}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
};

const compare = (a: Player, b: Player) => {
    // Sort by score DESC, then kills DESC, then deaths ASC and finally by name ASC
    return b.score - a.score || b.kills - a.kills || a.deaths - b.deaths || a.name.localeCompare(b.name);
}
