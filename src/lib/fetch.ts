import { unstable_cache } from 'next/cache';
import { Server } from '@/lib/types';

const fetchServersUncached = async (): Promise<Server[]> => {
    let cursor, after: string | undefined;
    let hasMore: boolean;
    const servers: Server[] = [];
    do {
        const url = new URL(
            '/v2/bf2/servers',
            'https://api.bflist.io',
        );
        url.searchParams.set('perPage', '100');

        // Set pagination parameters if present
        if (cursor && after) {
            url.searchParams.set('cursor', cursor);
            url.searchParams.set('after', after);
        }

        const resp = await fetch(url, { cache: 'no-store' });

        if (!resp.ok) {
            throw new Error(`Failed to fetch servers: ${resp.status} ${resp.statusText}`);
        }

        const data = await resp.json() as {
            servers: Server[]
            cursor: string
            hasMore: boolean
        };

        for (const server of data.servers) {
            servers.push(server);
            // Update `after` marker on the fly (avoids having to pop() later)
            after = server.ip + ':' + server.port;
        }

        cursor = data.cursor;
        hasMore = data.hasMore;
    } while (hasMore);

    return servers;
};

export const fetchServers = unstable_cache(
    fetchServersUncached,
    [ 'servers' ],
    { revalidate: 30 },
);

export const fetchServer = async (ip: string, port: string): Promise<Server | undefined> => {
    // Resolve details from the cached, fully paginated server list.
    const servers = await fetchServers();
    return servers.find((s) => s.ip == ip && s.port.toString() == port);
};
