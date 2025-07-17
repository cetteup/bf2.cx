import { Buddy, Player } from '@/lib/types';

type Streamer = {
    pid: number
    name: string
    platform: 'twitch' | 'youtube'
    url: string
}

const streamers: Streamer[] = [
    {
        pid: 500470370,
        name: 'twitch.tv/bf2tv',
        platform: 'twitch',
        url: 'https://twitch.tv/bf2tv',
    },
    {
        pid: 500464498,
        name: 'twitch.tv/netskytv',
        platform: 'twitch',
        url: 'https://twitch.tv/netskytv',
    },
    {
        pid: 500289434,
        name: 'Tomix...',
        platform: 'twitch',
        url: 'https://www.twitch.tv/tomixbf2',
    },
];

export const getActiveStreamerByPlayer = (player: Player | Buddy): Streamer | undefined => {
    // Require streamers to use STREAM tag as some kind of "I am currently streaming" indicator
    if (player.tag.toLowerCase() != 'stream') {
        return;
    }

    return streamers.find((s) => {
        return s.pid == player.pid && s.name == player.name;
    });
};
