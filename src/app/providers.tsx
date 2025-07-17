'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query';
import { BuddyListProvider } from '@/lib/localstorage';

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BuddyListProvider>
                {children}
            </BuddyListProvider>
        </QueryClientProvider>
    );
}
