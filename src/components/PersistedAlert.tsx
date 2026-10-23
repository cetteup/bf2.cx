'use client';

import { useSyncExternalStore } from 'react';
import { Alert } from 'react-bootstrap';
import type { ComponentProps } from 'react';
import { useDismissedAlerts } from '@/lib/localstorage';

type Props = Omit<ComponentProps<typeof Alert>, 'dismissible' | 'onClose'> & {
    alertKey: string;
};

const subscribeToNothing = () => () => {};

export function PersistedAlert({ alertKey, ...props }: Props) {
    const { value: dismissedAlerts, setValue: setDismissedAlerts } = useDismissedAlerts();
    const isDismissed = useSyncExternalStore(
        subscribeToNothing,
        () => dismissedAlerts.includes(alertKey),
        () => true,
    );

    const dismiss = () => {
        setDismissedAlerts(previous =>
            previous.includes(alertKey) ? previous : [...previous, alertKey],
        );
    };

    if (isDismissed) {
        return null;
    }

    return <Alert {...props} dismissible onClose={dismiss}/>;
}
