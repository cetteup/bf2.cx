import { FC } from 'react';
import { Player, Team } from '@/lib/types';
import { Table } from 'react-bootstrap';
import { formatPlayerName } from '@/lib/utils';

type ServerDetailPlayerTableProps = {
    team: Team
    players: Player[]
}

export const ServerDetailPlayerTable: FC<ServerDetailPlayerTableProps> = ({ team, players }) => {
    return (
        <>
            <div className={'pe-auto my-2'}>
                <h3 className={'text-center bg-dark-subtle py-3'}>
                    {team.label}
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
                {players.map((p, i) => (
                    <tr key={i} className={'align-middle'}>
                        <td align={'right'}>{i + 1}</td>
                        <td>
                            <a href={`https://playerpath.link/p/${p.pid}`}
                               className={'text-white text-decoration-none'}>
                                {formatPlayerName(p)}
                            </a>
                        </td>
                        <td align={'right'}>{p.score}</td>
                        <td align={'right'}>{p.kills}</td>
                        <td align={'right'}>{p.score}</td>
                        <td align={'right'}>{p.ping}ms</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};
