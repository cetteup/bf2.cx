import { useCallback, useEffect, useState } from 'react';

export function useHasMounted() {
    const [ hasMounted, setHasMounted ] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}

declare global {
    interface Window {
        umami?: {
            track: (eventName: string, eventData?: Record<string, any>) => void;
        };
    }
}

export function useTracking() {
    const trackEvent = useCallback(
        (eventName: string, eventData?: Record<string, any>) => {
            if (typeof window !== 'undefined' && window.umami?.track) {
                window.umami.track(eventName, eventData);
            }
        },
        [],
    );

    return { trackEvent };
}

