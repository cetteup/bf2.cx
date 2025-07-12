'use client';

import { FC } from 'react';
import { isHumanPlayer } from '@/lib/utils';
import { Table } from 'react-bootstrap';
import { ServerListTableRow } from '@/components/ServerList/ServerListTableRow';
import { Server } from '@/lib/types';

type ServerListTableProps = {
    servers: Server[]
}

export const ServerListTable: FC<ServerListTableProps> = ({servers}) => {
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
            {servers.sort((a, b) => b.players.filter(isHumanPlayer).length - a.players.filter(isHumanPlayer).length).map((s) => {
                // TODO Tiebreaker sort
                return (
                    <ServerListTableRow key={s.guid} server={s}/>
                );
            })}
            </tbody>
        </Table>
    );
};
