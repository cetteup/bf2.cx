'use client';

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Buddy } from '@/lib/types';

function useLocalStorage<T>(key: string, initialValue: T) {
    const isClient = typeof window !== 'undefined';

    const getStoredValue = (): T => {
        if (!isClient) return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error parsing localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [ storedValue, setStoredValue ] = useState<T>(getStoredValue);

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            setStoredValue(prev => {
                const valueToStore = value instanceof Function ? value(prev) : value;
                try {
                    if (isClient) {
                        window.localStorage.setItem(key, JSON.stringify(valueToStore));
                    }
                } catch (error) {
                    console.warn(`Error setting localStorage key "${key}":`, error);
                }
                return valueToStore;
            });
        },
        [ key, isClient ],
    );

    return [ storedValue, setValue ] as const;
}

function createLocalStorageContext<T>(key: string, initialValue: T) {
    const Context = createContext<{
        value: T;
        setValue: React.Dispatch<React.SetStateAction<T>>;
    } | null>(null);

    const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
        const [ value, setValue ] = useLocalStorage<T>(key, initialValue);

        return (
            <Context.Provider value={{ value, setValue }}>
                {children}
            </Context.Provider>
        );
    };

    const useLocalStorageContext = () => {
        const context = useContext(Context);
        if (!context) {
            throw new Error('useLocalStorageContext must be used within its provider');
        }
        return context;
    };

    return {
        LocalStorageProvider,
        useLocalStorageContext,
    };
}

export const {
    LocalStorageProvider: BuddyListProvider,
    useLocalStorageContext: useBuddyList,
} = createLocalStorageContext<Buddy[]>('buddies', []);
