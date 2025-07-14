'use client';

import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { ServerDetailPlayerTable } from '@/components/ServerDetail/ServerDetailPlayerTable';

export default function Loading() {
    return (
        <>
            <Container>
                <h1 className={'display-4'}><Placeholder xs={7}/></h1>
                <h3><Placeholder xs={6}/></h3>
                <h5><Placeholder xs={8}/></h5>

                <Container className={'mt-3'}>
                    <Row>
                        {[ ...Array(2).keys() ].map((i) => (
                            <Col key={i}>
                                <ServerDetailPlayerTable isLoading={true}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
        </>
    );
}
