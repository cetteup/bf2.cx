'use client';

import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { entries } from '@/lib/faq';
import { useParams, usePathname } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import { AccordionEventKey } from 'react-bootstrap/AccordionContext';

export default function FAQ() {
    const [ activeKey, setActiveKey ] = useState<AccordionEventKey>();
    const params = useParams();
    const path = usePathname();

    useEffect(() => {
        setActiveKey(window.location.hash.slice(1));
        scrollIntoView(document.getElementById(window.location.hash.slice(1)));
    }, [ params ]);

    useEffect(() => {
        const anchor = activeKey ? '#' + activeKey : path;
        history.replaceState(null, '', anchor);
    }, [ activeKey, path ]);

    const onSelect = (key: AccordionEventKey, event: SyntheticEvent<unknown, Event>) => {
        setActiveKey(key);
        if (key != null && event.target instanceof Element) {
            scrollIntoView(event.target);
        }
    };

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
