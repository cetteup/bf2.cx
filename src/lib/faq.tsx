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
                    href={'https://joinme.click/download'}>joinme.click launcher</a> installed.
                    With the launcher installed, the game should launch and automatically join the selected server
                    when you click <i className={'bi-play-circle'}/>.
                </p>
                <p>
                    If you still cannot join servers after installing the launcher, please hop into the <a
                    href={'https://discord.gg/66u9udBF57'}>joinme.click Discord server</a> and
                    describe your issue.
                </p>
            </>
        ),
    },
    {
        id: 'missing-join-server',
        header: 'Why do some servers not have a "Join server" option?',
        body: (
            <>
                <p>
                    Not all servers are supported by the <a
                    href={'https://joinme.click/download'}>joinme.click launcher</a>, which powers
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
        header: 'How can I add a website/Discord/TeamSpeak link for my server?',
        body: (
            <>
                <p>
                    By adding <a href={'https://sponsortext.cetteup.com/'}>sponsortext</a> variables
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
    {
        id: 'greyed-out-provider-icons',
        header: 'Why is the BF2Hub/PlayBF2/OpenSpy logo greyed out for some servers?',
        body: (
            <>
                <p>
                    The &quot;provider&rdquo; icon is greyed out if a server does not actively report which provider it
                    is using. We do our best to determine the most likely provider for such servers. This, however,
                    involves additional effort and isn&lsquo;t error-free - which is why the logo is greyed out.
                </p>
                <p>
                    Server admins should ensure their servers actively report their provider using
                    a <code>provider</code> <a
                    href={'https://sponsortext.cetteup.com/'}>sponsortext</a> variable.
                    The following values are supported for the variable:
                </p>
                <ul>
                    <li><code>bf2hub.com</code> / <code>bf2hub</code></li>
                    <li><code>playbf2.ru</code> / <code>playbf2</code></li>
                    <li><code>openspy.net</code> / <code>openspy</code></li>
                </ul>
            </>
        ),
    },
    {
        id: 'live-stream-links',
        header: 'I live-stream Battlefield 2. How can I get the site to show a link to my stream?',
        body: (
            <>
                <p>Two things are required for us to show a link to your live-stream:</p>
                <ol>
                    <li>
                        Your Battlefield 2 account and stream details need to be added to our list of known streamers.
                    </li>
                    <li>You need to put on a <code>STREAM</code> tag to indicate that you are live.</li>
                </ol>
                To get your details added, please either post in our <a
                href={'https://discord.gg/fq7c46prEX'} rel={'noreferrer'}>Discord</a> or open pull request on <a
                href={'https://github.com/cetteup/bf2.cx'} rel={'noreferrer'}>GitHub</a>.
            </>
        ),
    },
];
