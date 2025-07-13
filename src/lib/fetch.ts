import { Server } from '@/lib/types';

export const fetchServers = async (): Promise<Server[]> => {
    let cursor, after: string | undefined;
    let hasMore: boolean;
    const servers = [];
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

        console.log('Fetching', url.toString());

        const resp = await fetch(url);
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

export const fetchServer = async (ip: string, port: string): Promise<Server> => {
    const url = new URL(
        `/v2/bf2/servers/${ip}:${port}`,
        'https://api.bflist.io',
    );

    const resp = await fetch(url);
    return await resp.json();
};
