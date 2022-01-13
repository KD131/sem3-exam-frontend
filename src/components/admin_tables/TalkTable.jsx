import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function TalkTable() {
    const [content, setContent] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.getAllConferences(setContent, mounted);
        return () => mounted.current = false;
    }, []);

    function SingleConferenceRow({ conference }) {
        const { id, name, location, capacity, date, time, talks } = conference;

        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{location}</td>
                <td>{capacity}</td>
                <td>{talks.map(t => t.topic).join("<br>")}</td>
                <td>{date.year}-{date.month}-{date.day}</td>
                <td>{time.hour}:{time.minute}</td>
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
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Talks</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th><Button variant="success">Create</Button></th>
                    </tr>
                </thead>
                {content &&
                    <tbody>
                        {content.map(c => <SingleConferenceRow key={c.id} conference={c} />)}
                    </tbody>}
            </Table>
        </div>
    );
}

export default TalkTable;