import { Buddy, Player, Provider, Server } from '@/lib/types';
import { Address4, Address6 } from 'ip-address';

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

export function formatTeamLabel(gameVariant: string, teamLabel: string): string {
    if (gameVariant == 'bfp2') {
        if (teamLabel == 'ud') {
            return 'Undead';
        } else if (teamLabel == 'pl') {
            return 'Peglegs';
        }
    }

    return teamLabel
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

    // Reject URLs with special/dummy hostnames (would not be reachable from the public internet)
    if ([
        'localhost',
        'example.com',
    ].includes(url.hostname)) {
        return false;
    }

    // Reject URLs with non-global IP addresses (would not be reachable from the public internet)
    const [ isIPAddress, isGlobal ] = isGlobalIPAddress(url.hostname);
    if (isIPAddress && !isGlobal) {
        return false;
    }

    return protocols.length == 0 || protocols.includes(url.protocol);
}

export function isGlobalIPAddress(value: string): [boolean, boolean] {
    try {
        const address = new Address4(value);
        return [true, address.isGlobal()];
    } catch {
        // not an IPv4 address, ignore and continue
    }

    try {
        const address = new Address6(value);
        return [true, address.isGlobal()];
    } catch {
        // not an IPv6 address, ignore and continue
    }

    return [false, false];
}

// Weekend Warriors started using coop bots which are not marked as AIBots in the server query response
// Bots are using valid BF2Hub accounts, the only way to reliably detect them is by their pid and name
const knownBots = new Map<number, string>([
    [4073414, 'Fizbane'],
    [37019452, 'Cra-z-gurl'],
    [43378251, 'Kol.Kanada'],
    [43437661, '3rD.GOA.GodFather'],
    [43680492, 'Bro-Belgareth'],
    [43725586, 'k1n6t1m'],
    [43734692, 'cho-aniki'],
    [43810485, 'w1nblows'],
    [44034035, '404-masterblaster'],
    [44062104, 'wax-wax-wax'],
    [44475370, '3rd-EasyTarget'],
    [44499677, 'Gri5u'],
    [44515868, 'Zer0-Eagle'],
    [44688903, 'Sna-SpecialistNL'],
    [44893703, 'Pyr0fin'],
    [44935407, '0megadawn'],
    [45054074, 'pip-blacky'],
    [45127206, 'hay0r'],
    [45255746, 'oOparticleOo'],
    [45382307, 'gil-ISRAELI-ARMY'],
    [45401048, '9voltneville'],
    [45632401, 'HUSA01'],
    [45641272, 'f4l.Crime'],
    [45811351, 'D4R7H_H0M3R'],
    [46225140, 'MrP0larBear'],
    [47263041, 'D4r3D3vi1_BR'],
    [47301309, 'ZeR0-IVIanCeR'],
    [47696182, 'FizbaNDHR'],
    [48073029, 'Gil-The-King'],
    [48622106, 'gra-son'],
    [48817384, 'Far-sight-xr20'],
    [48994226, 'DEL-Alex'],
    [49060719, 'YetAnotherMedic'],
    [55582387, 'vic.chen'],
    [57563614, 'n0vaa'],
    [57639408, 'Mar-Mighty_Good'],
    [57739528, 'gre-benezy'],
    [57767783, 'Pug-Shoes'],
    [58994910, 'quaadez'],
    [59244501, 'FOG-Beowolf'],
    [59575772, 'TAL-MASRI'],
    [59623960, 'uni-splined'],
    [59965891, 'Jax-Vesper'],
    [60175695, 'cra-Z-chick'],
    [60395848, 'VIK-VICIOUS'],
    [60859028, 'Tin-of-Spam'],
    [61541365, 'SAF.RinseouT'],
    [62090756, 'CAF-Nighthawk'],
    [62434097, 'Tin-of-Beanz'],
    [62585479, 'Axl.Apollo'],
    [62606273, 'SNA-SHARK'],
    [62961460, 'enza22'],
    [63707594, '9VoltChiken'],
    [64546830, 'Col-ASCII'],
    [64763962, 'Mat-Montana'],
    [64862853, 'min-dolppi'],
    [65060948, 'axl.cap'],
    [65512673, 'zig-zag2929'],
    [66357354, 'vex.no.mind'],
    [66396132, 'zed-devil'],
    [66514751, 'CAF-CapnCrunch'],
    [66660223, 'CLo0uD'],
    [67057602, 'nap-marine-sniper'],
    [67398205, 'rar.exe'],
    [67845071, 'elt3hawk'],
    [67858101, 'Uni-Sensei'],
    [68172878, 'nil.desperandum'],
    [68330636, 'B0n35haker'],
    [69174452, 'MIN-RKO-RANDORTON'],
    [69225702, 'Jam-Master-L'],
    [69538026, 'sho-ryuu-reppaa'],
    [70005839, 'B0n3.Bone'],
    [70679238, 'CAC.Drunken'],
    [70861613, 'Pyr0glyph'],
    [75676874, 'joa-neo'],
    [76508680, 'Cin.nx'],
    [76538546, 'tor.h.nilsen'],
    [78013798, 'Jax00nz'],
    [78499773, 'T0x1c_Av3ng3r'],
    [78938797, 'MrT.Hagen'],
    [83366309, 'HAL-MNKC'],
    [85313864, 'sh4arkY'],
    [85895779, 'DRE-estro'],
    [86294831, 'ooparkoo'],
    [87000635, 'p0c.HeavydutY'],
    [87047197, 'F4lC0NFL'],
    [88159700, 'Tal-Kaplan-ISR'],
    [89643818, 'Col-Carlos'],
    [90369802, 'kar-kabron'],
    [90500100, 'NAP-Bullet'],
    [92243584, 'Rat-er-taT'],
    [98826237, 'Mol-La-Moule'],
    [103470958, 'ron-israel-army'],
    [108197331, 'blu-cartell'],
    [108776167, 'Tok-Apophis'],
    [111116870, 'SOU-KEN-BiTYA100'],
    [111612015, 'sh4b0nice'],
    [112658166, 'mrM4rcus'],
    [117297948, 'pan-tratatata'],
    [124765270, 'Tor-w-Hammer'],
    [129467363, 'm0r1bund_z3r0'],
    [142389980, 'pug106gti'],
    [147092475, 'Vic.Cebraham'],
    [149342106, 'vik.casar'],
    [151687273, 'MrP.NoOb'],
    [156398787, 'Rat-issage'],
    [163339471, 'MAT-BROWN'],
    [164615658, 'ENZ0de0UF'],
    [173478338, 'Bro-Gangstaar'],
    [175033717, 'NIL-monster-KILL'],
    [178312814, 'Cac.cz'],
    [179683406, 'H0tandSP1Cy'],
    [184885774, 'Blu-RayCharles'],
    [189268401, 'Sho.Leipzig'],
    [192287649, 'Ech0_Phyb3r'],
    [217668409, 'Pan-Maxx-2'],
    [220167584, 'mrn-jayjay'],
    [223725847, 'DrD0ct0r'],
    [227638091, 'W0bie'],
    [233141390, 'GRA.CANTOS'],
    [233151998, 'Can-O-Junk'],
    [239799032, 'w1ldebeast'],
    [254433328, '0MeckieMesser0'],
    [260645244, 'DrD1vinity'],
    [290754821, 'LaZ0rGuN.'],
    [295630425, 'Dre.Pepper'],
    [334913627, 'und-ende'],
    [457769629, 'Bol2_painT'],
    [500071174, 'but2addicted2quit'],
    [500182510, 'GostSoldier44'],
    [500216503, 'LIT-RIGHT-NOW'],
    [500225869, 'W1nCod'],
    [500603298, 'pokemelik'],
]);

export function isHumanPlayer(player: Player): boolean {
    // Exclude AI bots (used on coop servers)
    if (player.aibot) {
        return false;
    }

    // Exclude players without a valid pid (e.g. players that have not fully connected yet)
    // (will cause a negligible number of false positives by matching players using local profiles on unranked servers)
    if (player.pid <= 0) {
        return false;
    }

    // Exclude Gameppy AI bot PID range
    if (player.pid >= 920000000 && player.pid < 930000000) {
        return false;
    }

    // Exclude known bots
    if (knownBots.get(player.pid) === player.name) {
        return false;
    }

    // Human players are expected to have a ping > 0 (once fully connected),
    // or at least one of score/kills/deaths > 0
    return player.ping > 0 || player.score != 0 || player.kills > 0 || player.deaths > 0;
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
