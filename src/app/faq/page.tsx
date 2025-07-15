'use client';

import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { entries } from '@/lib/faq';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AccordionEventKey } from 'react-bootstrap/AccordionContext';

export default function FAQ() {
    const [ activeKey, setActiveKey ] = useState<AccordionEventKey>();
    const params = useParams();

    useEffect(() => {
        setActiveKey(window.location.hash.slice(1));
    }, [ params ]);

    return (
        <>
            <h1 className={'display-4'}>Frequently asked questions</h1>
            <Accordion activeKey={activeKey} onSelect={setActiveKey} className={'mt-2'}>
                {entries.map((entry, i) => (
                    <AccordionItem key={i} eventKey={entry.id}>
                        <AccordionHeader>
                            <i className={'bi-question-circle-fill me-2'}/>
                            {entry.header}
                        </AccordionHeader>
                        <AccordionBody>
                            {entry.body}
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}
