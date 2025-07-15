import { Player } from '@/lib/types';

type Streamer = {
    pid: number
    name: string
    platform: string
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
];

export const getActiveStreamerByPlayer = (player: Player): Streamer | undefined => {
    // Require streamers to use STREAM tag as some kind of "I am currently streaming" indicator
    if (player.tag.toLowerCase() != 'stream') {
        return;
    }

    return streamers.find((s) => {
        return s.pid == player.pid && s.name == player.name;
    });
};
