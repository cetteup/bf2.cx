import { Buddy, Player, Provider, Server } from '@/lib/types';

export function isEmpty(value: object): boolean {
    return Object.keys(value).length === 0;
}

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

export function formatPlayerName(player: Player | Buddy): string {
    if (player.tag == '') {
        return player.name;
    }

    return player.tag + ' ' + player.name;
}

export function buildPlayerProfileURL(player: Player): string {
    const url = new URL(
        '/p/' + player.pid,
        'https://playerpath.link/',
    );
    // Add nick to act as tiebreaker in case of multiple players with the same pid
    url.searchParams.set('nick', player.name);
    // Add tag to allow redirector to detect truncated player names
    url.searchParams.set('tag', player.tag);
    return url.href;
}

export function isValidURL(value: string | null, ...protocols: string[]): boolean {
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
    { ip: '212.159.106.97', provider: 'bf2hub.com' }, // Team [UKoM]
    { ip: '74.91.114.183', provider: 'bf2hub.com' }, // The Other Guys
    { ip: '116.62.207.38', provider: 'bf2hub.com' }, // China #1 wuxianzaiju
    { ip: '51.161.201.123', provider: 'bf2hub.com' }, // AUSTRALIAN HUB BF2
    { ip: '185.107.97.236', provider: 'bf2hub.com' }, // rabujex
    { ip: '37.230.210.130', provider: 'playbf2.ru' }, // PlayBF2/T-Gamer
    { ip: '64.176.18.49', provider: 'bf2hub.com' }, // BF2SUDAMERICA.COM
    { ip :'178.83.141.175', provider: 'bf2hub.com' }, // [South America Server]
    { ip: '91.226.93.158', provider: 'playbf2.ru' }, // PlayBF2! RELAXDOM
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
