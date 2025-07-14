'use client';

import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { ServerListTable } from '@/components/ServerList/ServerListTable';
import { isHumanPlayer } from '@/lib/utils';

const nf = new Intl.NumberFormat('en-US');

export const ServerList: FC = () => {
    const { data: servers } = useSuspenseQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
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
            <p className={'lead'}>
                {nf.format(humanPlayers)} players are playing online
                across {populatedServers.length} servers.
            </p>
            <ServerListTable servers={servers}/>
        </>
    );
};
