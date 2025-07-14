'use client';

import { FC } from 'react';
import { isHumanPlayer } from '@/lib/utils';
import { Placeholder, Table } from 'react-bootstrap';
import { ServerListTableRow } from '@/components/ServerList/ServerListTableRow';
import { Server } from '@/lib/types';

type ServerListTableProps = {
    servers?: Server[]
    placeholders?: number
}

export const ServerListTable: FC<ServerListTableProps> = ({ servers, placeholders }) => {
    return (
        <Table variant={'dark'} size={'xl'} hover responsive className={'align-middle'}>
            <thead>
            <tr>
                <th className={'col'}></th>
                <th className={'col'}></th>
                <th className={'col'}>Name</th>
                <th className={'col text-end'}>Players</th>
                <th className={'col'}>Map</th>
                <th className={'col'}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {placeholders && [ ...Array(placeholders).keys() ].map((i) => (
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
            {servers && servers.sort((a, b) => b.players.filter(isHumanPlayer).length - a.players.filter(isHumanPlayer).length).map((s) => {
                // TODO Tiebreaker sort
                return (
                    <ServerListTableRow key={s.guid} server={s}/>
                );
            })}
            </tbody>
        </Table>
    );
};
