import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function TalkSpeakersModal({ talk }) {
    const [speakers, setSpeakers] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.getAllSpeakers(setSpeakers, mounted);
        return () => mounted.current = false;
    }, []);

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    function SingleRow({ speaker }) {
        const { id, name } = speaker;

        return (
            <div>
                <Row className="mb-2">
                    <Col>{name}</Col>
                    <Col>
                        {talk.speakers.find(s => s.id === id)
                            ? <Button variant="danger">Remove</Button>
                            : <Button variant="success">Add</Button>}
                    </Col>
                </Row>
            </div>
        )
    }



    return (
        <>
            <Button variant="warning" className="me-1" onClick={handleShow}>Edit speakers</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change speakers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h5>Added speakers</h5>
                        </Col>
                        <Col>
                            <h5>All speakers</h5>
                            {speakers && speakers.map(s => <SingleRow key={s.id} speaker={s} />)}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TalkSpeakersModal;