import { useCallback, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHasMounted() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

declare global {
    interface Window {
        umami?: {
            track: (eventName: string, eventData?: Record<string, unknown>) => void;
        };
    }
}

export function useTracking() {
    const trackEvent = useCallback(
        (eventName: string, eventData?: Record<string, unknown>) => {
            if (typeof window !== 'undefined' && window.umami?.track) {
                window.umami.track(eventName, eventData);
            }
        },
        [],
    );

    return { trackEvent };
}
