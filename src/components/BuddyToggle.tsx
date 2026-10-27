'use client';

import { FC, useState } from 'react';
import { Buddy } from '@/lib/types';
import { useBuddyList } from '@/lib/localstorage';
import { useHasMounted, useTracking } from '@/lib/hooks';

type BuddyToggleProps = {
    pid: number
    name: string
    tag: string
}

export const BuddyToggle: FC<BuddyToggleProps> = ({ pid, name, tag }) => {
    const { trackEvent } = useTracking();

    const { value: buddies, setValue: setBuddies } = useBuddyList();
    const [ hover, setHover ] = useState(false);
    const hasMounted = useHasMounted();

    const buddy = isBuddy(pid, name, buddies);
    const className = buddy
        ? (hover ? 'bi-person-fill-dash buddy-active' : 'bi-person-fill buddy-active')
        : (hover ? 'bi-person-fill-add' : 'bi-person');

    // Prevent hydration errors
    // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
    if (!hasMounted) {
        return (
            <i className={'buddy bi-person'}/>
        );
    }

    return (
        <i
            className={'buddy ' + className}
            title={buddy ? 'Remove buddy' : 'Add buddy'}
            onClick={() => {
                if (buddy) {
                    setBuddies(buddies.filter((b) => b.pid != pid && b.name != name));
                    trackEvent('remove-buddy', { buddy: name });
                } else {
                    setBuddies([ ...buddies, { pid, name, tag } ]);
                    trackEvent('add-buddy', { buddy: name });
                }
            }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        />
    );
};

const isBuddy = (pid: number, name: string, buddies: Buddy[]): boolean => {
    return buddies.some((b) => b.pid == pid && b.name == name);
};
