import { Player, Provider, Server } from '@/lib/types';

export function formatProvider(provider: Provider): string {
    switch (provider) {
        case 'bf2hub.com':
            return 'BF2Hub';
        case 'playbf2.ru':
            return 'PlayBF2';
        case 'openspy.net':
            return 'OpenSpy';
    }
}

export function isValidURL(value: string | null, ...protocols: string[] ): boolean {
    if (value == null) {
        return false;
    }

    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return false;
    }

    return protocols.length == 0 || protocols.includes(url.protocol);
}

export function isHumanPlayer(player: Player): boolean {
    return !player.aibot && (player.score != 0 || player.kills > 0 || player.deaths > 0 || player.ping > 0);
}

const knownServers: { ip: string, provider: Provider }[] = [
    { ip: '185.107.96.22', provider: 'bf2hub.com' }, // 2F4Y
    { ip: '141.94.204.21', provider: 'bf2hub.com' }, // SUPER@
    { ip: '173.234.79.175', provider: 'bf2hub.com' }, // Lost-Soldiers
    { ip: '138.197.130.124', provider: 'bf2hub.com' }, // Weekend Warriors
    { ip: '162.55.244.157', provider: 'bf2hub.com' }, // BF2L (and their customers)
    { ip: '37.230.210.130', provider: 'playbf2.ru' }, // PlayBF2/T-Gamer
];

export function determineProvider(server: Server): [ Provider | undefined, boolean ] {
    if (server.variables['provider']) {
        const value = server.variables['provider'].toLowerCase();

        if (value == 'bf2hub.com' || value == 'bf2hub') {
            return [ 'bf2hub.com', true ];
        }

        if (value == 'playbf2.ru' || value == 'playbf2') {
            return [ 'playbf2.ru', true ];
        }

        if (value == 'openspy.net' || value == 'openspy') {
            return [ 'openspy.net', true ];
        }
    }

    const known = knownServers.find((e) => e.ip == server.ip);
    if (known) {
        return [ known.provider, false ];
    }

    return [ undefined, false ];
}
