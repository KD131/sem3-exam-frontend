import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import apiFacade from "../../apiFacade";
import ErrorModal from "../error/ErrorModal";
import SpeakerModal from "./SpeakerModal";

function SpeakerTable() {
    const [content, setContent] = useState();
    const [error, setError] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.getAllSpeakers(setContent, mounted);
        return () => mounted.current = false;
    }, []);

    const handleSubmit = (speaker) => {
        if (speaker && speaker.id) {
            apiFacade.updateSpeaker(speaker, mounted, () => {
                apiFacade.getAllSpeakers(setContent, mounted);
            })
                .catch(err => {
                    if (err.status) {
                        err.fullError.then(e => {
                            setError(e);
                            apiFacade.getAllSpeakers(setContent, mounted);
                        })
                    }
                });
        }
        else {
            apiFacade.createSpeaker(speaker, mounted, () => {
                apiFacade.getAllSpeakers(setContent, mounted);
            })
                .catch(err => {
                    if (err.status) {
                        err.fullError.then(e => {
                            setError(e);
                            apiFacade.getAllSpeakers(setContent, mounted);
                        })
                    }
                });
        }
    }

    function SingleSpeakerRow({ speaker }) {
        const { id, name, profession, gender, talks } = speaker;

        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{profession}</td>
                <td>{gender}</td>
                <td>{talks && talks.map((t, i) => <p key={i}>{t.topic}</p>)}</td>
                <td>
                    <SpeakerModal editSpeaker={speaker} handleSubmit={handleSubmit} />
                    <Button variant="danger" className="ms-1">Delete</Button>
                </td>
            </tr>
        )
    }

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Profession</th>
                        <th>Gender</th>
                        <th>Talks</th>
                        <th><SpeakerModal handleSubmit={handleSubmit} /></th>
                    </tr>
                </thead>
                {content &&
                    <tbody>
                        {content.map(s => <SingleSpeakerRow key={s.id} speaker={s} />)}
                    </tbody>}
            </Table>
            <ErrorModal error={error} />
        </div>
    );
}

export default SpeakerTable;