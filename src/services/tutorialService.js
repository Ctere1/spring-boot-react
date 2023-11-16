import axios from "axios";
import authHeader from "./authHeader";

axios.defaults.baseURL = "http://localhost:8080/api/";

class TutorialDataService {
    getAll(params) {
        if (params.title && params.title !== "") {
            return axios.get(`tutorials?page=${params?.page}&size=${params?.size}&sort=${params?.sort}&title=${params?.title}`, { headers: authHeader() });
        } else {
            return axios.get(`tutorials?page=${params?.page}&size=${params?.size}&sort=${params?.sort}`, { headers: authHeader() });
        }
    }

    get(id) {
        return axios.get(`tutorials/${id}`, { headers: authHeader() });
    }

    create(data) {
        return axios.post("tutorials", data, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(`tutorials/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(`tutorials/${id}`, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(`tutorials`, { headers: authHeader() });
    }

    findByTitle(title) {
        return axios.get(`tutorials?title=${title}`, { headers: authHeader() });
    }

    findPublished(params) {
        return axios.get(`tutorials/published?page=${params?.page}&size=${params?.size}&sort=${params?.sort}`, { headers: authHeader() });
    }
}

const tutorialDataService = new TutorialDataService();

export default tutorialDataService;