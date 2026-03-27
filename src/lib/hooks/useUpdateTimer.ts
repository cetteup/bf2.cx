import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

/**
 * Hook to track the next data update time based on React Query's refetch interval
 * This keeps the update timer in sync with actual data fetches
 */
export function useUpdateTimer(queryKey: (string | number)[], refetchInterval: number = 30000) {
    const queryClient = useQueryClient();
    const [nextUpdateTime, setNextUpdateTime] = useState<number>(Date.now() + refetchInterval);

    useEffect(() => {
        const query = queryClient.getQueryData(queryKey);
        
        // Get the query's state metadata
        const queryState = queryClient.getQueryState(queryKey);
        
        if (queryState) {
            // Set initial next update time based on when the last fetch occurred
            const lastFetchTime = queryState.dataUpdatedAt || Date.now();
            setNextUpdateTime(lastFetchTime + refetchInterval);
        }

        // Listen for query updates
        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
            // Check if this event is for our query
            if (event.query.queryKey[0] === queryKey[0]) {
                if (event.type === 'updated') {
                    // Query was refetched, set next update time
                    setNextUpdateTime(Date.now() + refetchInterval);
                }
            }
        });

        return () => unsubscribe();
    }, [queryKey, queryClient, refetchInterval]);

    return nextUpdateTime;
}