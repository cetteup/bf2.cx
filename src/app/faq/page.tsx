import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { entries } from '@/lib/faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ - BF2.CX',
    description: 'Find answers to frequently asked questions around BF2.CX.',
};

export default function FAQ() {
    return (
        <>
            <h1 className={'display-4'}>Frequently asked questions</h1>
            <Accordion className={'mt-2'}>
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
