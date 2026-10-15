'use client';

import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { entries } from '@/lib/faq';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AccordionEventKey } from 'react-bootstrap/AccordionContext';
import { useHasMounted } from '@/lib/hooks';

export default function FAQ() {
    const path = usePathname();
    const hasMounted = useHasMounted();
    const [ activeSelection, setActiveSelection ] = useState<{
        path: string;
        key: AccordionEventKey;
    } | null>(null);
    const activeKey = activeSelection?.path === path
        ? activeSelection.key
        : (hasMounted ? window.location.hash.slice(1) || undefined : undefined);

    useEffect(() => {
        if (hasMounted && activeKey) {
            if (typeof activeKey === 'string') {
                scrollIntoView(document.getElementById(activeKey));
            }
        }
    }, [ activeKey, hasMounted ]);

    useEffect(() => {
        if (!hasMounted) {
            return;
        }

        const anchor = activeKey ? '#' + activeKey : path;
        history.replaceState(null, '', anchor);
    }, [ activeKey, hasMounted, path ]);

    const setActiveKey = (key: AccordionEventKey) => {
        setActiveSelection({ path, key });
    };

    const onSelect = (key: AccordionEventKey) => setActiveKey(key);

    return (
        <>
            <h1 className={'display-4'}>Frequently asked questions</h1>
            <Accordion activeKey={activeKey} onSelect={onSelect} className={'mt-2'}>
                {entries.map((entry, i) => (
                    <AccordionItem id={entry.id} key={i} eventKey={entry.id}>
                        <AccordionHeader>
                            <i className={'bi-question-circle-fill me-2'}/>
                            {entry.header}
                        </AccordionHeader>
                        <AccordionBody>
                            {typeof entry.body == 'function' ? entry.body(setActiveKey) : entry.body}
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

const scrollIntoView = (element: Element | null) => {
    setTimeout(() => {
        element?.closest('.accordion-item')
            ?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
    }, 400);
};
