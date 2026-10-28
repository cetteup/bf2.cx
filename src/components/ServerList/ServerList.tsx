'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchServers } from '@/lib/fetch';
import { ServerListTable } from '@/components/ServerList/ServerListTable';
import { isHumanPlayer } from '@/lib/utils';
import { useHasMounted } from '@/lib/hooks';
import { Placeholder } from 'react-bootstrap';

const nf = new Intl.NumberFormat('en-US');

export const ServerList: FC = () => {
    const hasMounted = useHasMounted();

    const { data } = useQuery({
        queryKey: [ 'servers' ],
        queryFn: fetchServers,
        enabled: hasMounted,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 2,
        // Only throw error if the query has no data, otherwise use previously cached data
        // (mirrors error handling behavior of `useSuspenseQuery`)
        throwOnError: (_, query) => query.state.data == undefined,
    });

    const servers = hasMounted ? data : undefined;

    if (!servers) {
        return (
            <>
                <p aria-hidden={true}>
                    <Placeholder xs={6}/>
                </p>
                <ServerListTable placeholders={32}/>
            </>
        );
    }

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
