'use client';

import { FC, useEffect, useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';

type FavoriteServerToggleProps = {
    guid: string
}

export const FavoriteServerToggle: FC<FavoriteServerToggleProps> = ({ guid }) => {
    const [ favoriteServers, setFavoriteServers ] = useLocalStorage<string[]>('favoriteServers', []);
    const [ hover, setHover ] = useState(false);
    const [ className, setClassName ] = useState('bi-heart');

    const isFavoriteServer = favoriteServers.includes(guid);
    useEffect(() => {
        if (isFavoriteServer) {
            if (hover) {
                setClassName('bi-heartbreak favorite-active');
            } else {
                setClassName('bi-heart-fill favorite-active');
            }
        } else {
            if (hover) {
                setClassName('bi-heart-half');
            } else {
                setClassName('bi-heart');
            }
        }
    }, [ isFavoriteServer, hover ]);

    return (
        <i
            className={'favorite ' + className}
            title={isFavoriteServer ? 'Remove server from favorites' : 'Add server to favorites'}
            onClick={() => {
                if (isFavoriteServer) {
                    setFavoriteServers(favoriteServers.filter((g) => g != guid));
                } else {
                    setFavoriteServers([ ...favoriteServers, guid ]);
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
