import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ErrorModal({ error }) {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        handleShow();
    }, [error]);

    if (!error) {
        return null;
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{error.code}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error.message}
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

export default ErrorModal;