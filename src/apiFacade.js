import { SERVER_URL } from "./settings";
import fetchData from "./utils/fetchData";

function getAllConferences(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/conferences/all`, "GET", setContent, mounted, true);
}

function getConferenceById(setContent, mounted, id) {
    fetchData(`${SERVER_URL}/api/conferences/id/${id}`, "GET", setContent, mounted, true);
}

function fetchAdminPage(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/info/admin`, "GET", setContent, mounted, true);
}

const apiFacade = {
    getAllConferences,
    getConferenceById,
    fetchAdminPage
}

export default apiFacade;
