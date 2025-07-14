'use client';

import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { ServerListTable } from '@/components/ServerList/ServerListTable';
import { isHumanPlayer } from '@/lib/utils';
import { Alert } from 'react-bootstrap';

const nf = new Intl.NumberFormat('en-US');

export const ServerList: FC = () => {
    const { data: servers } = useSuspenseQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
        retry: 2,
    });

    const populatedServers = servers
        .map((s) => ({
            ...s,
            players: s.players.filter(isHumanPlayer),
        }))
        .filter((s) => s.players.length > 0);
    const humanPlayers = populatedServers
        .reduce((acc, s) => acc + s.players.length, 0);

    return (
        <>
            <Alert variant={'info'} dismissible>
                <i className={'bi-info-circle-fill me-2'}/>
                The server list self-updates, no need to refresh the page or press any buttons!
            </Alert>
            <p className={'lead'}>
                {nf.format(humanPlayers)} players are playing online
                across {populatedServers.length} servers.
            </p>
            <ServerListTable servers={servers}/>
        </>
    );
};
