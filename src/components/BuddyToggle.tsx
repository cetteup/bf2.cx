'use client';

import { FC, useEffect, useState } from 'react';
import { Buddy } from '@/lib/types';
import { useBuddyList } from '@/lib/localstorage';
import { useHasMounted } from '@/lib/hooks';

type BuddyToggleProps = {
    pid: number
    name: string
    tag: string
}

export const BuddyToggle: FC<BuddyToggleProps> = ({ pid, name, tag }) => {
    const { value: buddies, setValue: setBuddies } = useBuddyList();
    const [ hover, setHover ] = useState(false);
    const [ className, setClassName ] = useState('bi-person');
    const hasMounted = useHasMounted();

    useEffect(() => {
        if (isBuddy(pid, name, buddies)) {
            if (hover) {
                setClassName('bi-person-fill-dash buddy-active');
            } else {
                setClassName('bi-person-fill buddy-active');
            }
        } else {
            if (hover) {
                setClassName('bi-person-fill-add');
            } else {
                setClassName('bi-person');
            }
        }
    }, [ pid, name, buddies, hover ]);

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
            title={isBuddy(pid, name, buddies) ? 'Remove buddy' : 'Add buddy'}
            onClick={() => {
                if (isBuddy(pid, name, buddies)) {
                    setBuddies(buddies.filter((b) => b.pid != pid && b.name != name));
                } else {
                    setBuddies([ ...buddies, { pid, name, tag } ]);
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
