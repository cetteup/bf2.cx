'use client';

import { useEffect, useState } from 'react';
import styles from './UpdateTimer.module.css';

interface UpdateTimerProps {
    nextUpdateTime: number; // Unix timestamp in milliseconds
    refetchInterval?: number; // Total refetch interval in milliseconds (default 30000)
}

export function UpdateTimer({ nextUpdateTime, refetchInterval = 30000 }: UpdateTimerProps) {
    const [ timeLeft, setTimeLeft ] = useState(0);
    const [ progress, setProgress ] = useState(100);

    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
            const totalTime = nextUpdateTime - now;

            if (totalTime <= 0) {
                setTimeLeft(0);
                setProgress(100);
                return;
            }

            setTimeLeft(totalTime);

            // Calculate progress percentage (0-100)
            // Progress goes from 100% (just updated) to 0% (time to update)
            const progressPercent = (totalTime / refetchInterval) * 100;
            setProgress(Math.max(0, Math.min(100, progressPercent)));
        };

        updateTimer();
        const interval = setInterval(updateTimer, 100);

        return () => clearInterval(interval);
    }, [ nextUpdateTime, refetchInterval ]);

    const seconds = Math.ceil(timeLeft / 1000);

    return (
        <div className={styles.container} title={`Next update in ${seconds}s`}>
            <svg className={styles.circle} viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className={styles.background}
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className={styles.progress}
                    style={{
                        strokeDasharray: `${(progress / 100) * 282.7} 282.7`,
                    }}
                />
            </svg>
            <div className={styles.text}>{seconds}</div>
        </div>
    );
}
