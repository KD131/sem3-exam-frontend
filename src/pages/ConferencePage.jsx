import { useEffect, useRef, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiFacade from "../apiFacade";

function ConferencePage() {
    const [content, setContent] = useState();
    const { id } = useParams();
    const mounted = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        apiFacade.getConferenceById(setContent, mounted, id);
        return () => mounted.current = false;
    }, [id]);

    if (!content) {
        return "Loading...";
    }

    function SingleTalk({ talk }) {
        const { id, topic, duration, speakers } = talk;

        return (
            <ListGroupItem action onClick={() => navigate(`/talks/${id}`)}>
                <h3>{topic}</h3>
                <p>with {speakers.map((s, i) => [i > 0 && ", ", <Link key={s.id} to={`/speakers/${s.id}`}>{s.name}</Link>])}</p>
                <small>{duration}</small>
            </ListGroupItem>
        )
    }

    const { name, location, capacity, date, time, talks } = content;

    return (
        <div>
            <h1>{name}</h1>
            <p>{location}</p>
            <p>Capacity: {capacity}</p>
            <p>{date.year}-{date.month}-{date.day}, {time.hour}:{time.minute}</p>
            <h2>Talks</h2>
            <ListGroup>
                {talks.map(t => <SingleTalk key={t.id} talk={t} />)}
            </ListGroup>
        </div>
    );
}

export default ConferencePage;