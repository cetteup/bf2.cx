import { ReactNode } from 'react';

type Entry = {
    id: string
    header: string | ReactNode
    body: string | ReactNode
}

export const entries: Entry[] = [
    {
        id: 'join-server-not-launching-game',
        header: (<>Why does the game not launch when I click <i className={'bi-play-circle mx-1'}/> (&quot;Join
            server&quot;)</>),
        body: (
            <>
                <p>
                    To join servers directly from your browser, you need to have the <a
                    href={'https://joinme.click/download'} target={'_blank'}>joinme.click launcher</a> installed.
                    With the launcher installed, the game should launch and automatically join the selected server
                    when you click <i className={'bi-play-circle'}/>.
                </p>
                <p>
                    If you still cannot join servers after installing the launcher, please hop into the <a
                    href={'https://discord.gg/66u9udBF57'} target={'_blank'}>joinme.click Discord server</a> and
                    describe your issue.
                </p>
            </>
        ),
    },
    {
        id: 'missing-join-server',
        header: (<>Why do some servers not have a &quot;Join server&quot; option?</>),
        body: (
            <>
                <p>
                    Not all servers are supported by the <a
                    href={'https://joinme.click/download'} target={'_blank'}>joinme.click launcher</a>, which powers
                    the &quot;Join server&quot; option.
                    If a server is not supported by the launcher, we don&lsquo;t show the <i
                    className={'bi-play-circle'}/> option.
                </p>
                <p>
                    The launcher currently supports <strong>passwordless</strong> servers running either the base game
                    or one of the following mods:
                </p>
                <ul>
                    <li>Special Forces (<code>xpack</code>)</li>
                    <li>Allied Intent Xtended (<code>aix2</code>)</li>
                    <li>Arctic Warfare (<code>arctic_warfare</code>)</li>
                    <li>Battlefield Pirates 2 (Yarr2) (<code>bfp2</code>)</li>
                    <li>Point of Existence 2 (<code>poe2</code>)</li>
                </ul>
            </>
        ),
    },
    {
        id: 'adding-server-links',
        header: (<>How can I add a website/Discord/TeamSpeak link for my server?</>),
        body: (
            <>
                <p>
                    By adding <a href={'https://sponsortext.cetteup.com/'} target={'_blank'}>sponsortext</a> variables
                    to your server.
                    The following variables are supported:
                </p>
                <ul>
                    <li><code>website</code></li>
                    <li><code>discord</code></li>
                    <li><code>teamspeak</code></li>
                </ul>
                <p>
                    If a variable does not contain a valid URL, it is ignored.
                    For <code>teamspeak</code>, using a <code>ts3server://</code> or <code>teamspeak://</code> URL
                    allows players to join the server directly.
                </p>
            </>
        ),
    },
];
