import { FC } from 'react';
import { Player, Team } from '@/lib/types';
import { Placeholder, Table } from 'react-bootstrap';
import { formatPlayerName } from '@/lib/utils';
import { getActiveStreamerByPlayer } from '@/lib/streamers';

type ServerDetailPlayerTableProps = {
    team?: Team
    players?: Player[]
    isLoading?: boolean
}

export const ServerDetailPlayerTable: FC<ServerDetailPlayerTableProps> = ({ team, players, isLoading }) => {
    return (
        <>
            <div className={'pe-auto my-2'}>
                <h3 className={'text-center bg-dark-subtle py-3'}>
                    {isLoading && <Placeholder xs={2} size={'lg'}></Placeholder>}
                    {team && team.label}
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
                {players && players.map((p, i) => {
                    // Show a stream platform link if player is known streamer (and currently [likely to be] live)
                    const streamer = getActiveStreamerByPlayer(p);
                    return (
                        <tr key={i} className={'align-middle'}>
                            <td align={'right'}>{i + 1}</td>
                            <td>
                                <a href={`https://playerpath.link/p/${p.pid}`}
                                   className={'text-white text-decoration-none'}>
                                    {formatPlayerName(p)}
                                </a>
                                {streamer && (
                                    <span className={'ms-1'}>
                                    <a href={streamer.url} data-umami-event={'watch-stream'}>
                                        <i
                                            className={`bi-${streamer.platform} align-middle`}
                                            title={'Watch live-stream'}
                                        />
                                    </a>
                                </span>
                                )}
                            </td>
                            <td align={'right'}>{p.score}</td>
                            <td align={'right'}>{p.kills}</td>
                            <td align={'right'}>{p.deaths}</td>
                            <td align={'right'}>{p.ping}ms</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
};
