import { Server } from '@/lib/types';
import { CSSProperties, FC } from 'react';
import { determineProvider, formatProvider } from '@/lib/utils';
import Image from 'next/image';

type ProviderIconProps = {
    server: Server
    width: number
    height: number
    className?: string
    style?: CSSProperties
}

export const ProviderIcon: FC<ProviderIconProps> = ({ server, width, height, className, style }) => {
    const [ provider, explicit ] = determineProvider(server);

    if (!provider) {
        return null;
    }

    return (
        <Image
            src={`/${provider}.png`}
            width={width}
            height={height}
            quality={100}
            className={className}
            style={{
                opacity: explicit ? 1 : 0.6,
                ...style,
            }}
            alt={formatProvider(provider)}
            title={'Uses ' + formatProvider(provider)}
        />
    )
};
