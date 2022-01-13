import { SERVER_URL } from "./settings";
import fetchData from "./utils/fetchData";

function getAllConferences(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/conferences/all`, "GET", setContent, mounted, true);
}

function getConferenceById(setContent, mounted, id) {
    fetchData(`${SERVER_URL}/api/conferences/id/${id}`, "GET", setContent, mounted, true);
}

function getAllTalks(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/talks/all`, "GET", setContent, mounted, true);
}

function getTalkById(setContent, mounted, id) {
    fetchData(`${SERVER_URL}/api/talks/id/${id}`, "GET", setContent, mounted, true);
}

function getAllSpeakers(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/speakers/all`, "GET", setContent, mounted, true);
}

function getSpeakerById(setContent, mounted, id) {
    fetchData(`${SERVER_URL}/api/speakers/id/${id}`, "GET", setContent, mounted, true);
}

const apiFacade = {
    getAllConferences,
    getConferenceById,
    getAllTalks,
    getTalkById,
    getAllSpeakers,
    getSpeakerById
}

export default apiFacade;
