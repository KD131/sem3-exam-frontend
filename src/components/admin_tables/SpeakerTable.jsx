import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function SpeakerTable() {
    const [content, setContent] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.getAllSpeakers(setContent, mounted);
        return () => mounted.current = false;
    }, []);

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
                    <Button variant="warning" className="me-1">Edit</Button>
                    <Button variant="danger">Delete</Button>
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
                        <th><Button variant="success">Create</Button></th>
                    </tr>
                </thead>
                {content &&
                    <tbody>
                        {content.map(s => <SingleSpeakerRow key={s.id} speaker={s} />)}
                    </tbody>}
            </Table>
        </div>
    );
}

export default SpeakerTable;