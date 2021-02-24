import api from 'api';
import moment from 'moment';

function getProjects() {
    return api.get('/api/projects')
    .then((res) => {
        return res.data;
    });
}

function getProjectsSearch(search) {
    return api.get('/api/projects', {
        params: search
    })
    .then((res) => {
        return res.data;
    });
}

function getProjectById(id) {
    return api.get(`/api/projects/${id}`)
    .then((res, reject) => {
        console.log("error", res)
        if (res.data.length < 1) {
            reject();
        } else {
            var project = res.data[0];
            var projectObj = {
                firstname: project.firstname,
                lastname: project.lastname,
                street: project.street,
                city: project.city,
                state: project.state,
                zip: project.zip,
                status: project.status,
                lastmodified: project.lastmodified
            }
            return projectObj;
        }
    })
}

function getProjectDesigns(id) {
    return api.get(`/api/projects/${id}/designs`)
    .then((res) => {
        return res.data;
    });
}

function postProject(project) {
    return api.post('/api/projects', {
        firstname: project.firstname,
        lastname: project.lastname,
        street: project.street,
        city: project.city,
        state: project.state,
        zip: Number(project.zip),
        lastmodified: moment().format('M/D/YY')
    })
    .then((res) => {
        return res.data.rows[0].project_id;
    });
}

function putProject(project, id) {
    return api.put(`/api/projects/${id}`, {
        project: {
            firstname: project.firstname,
            lastname: project.lastname,
            street: project.street,
            city: project.city,
            state: project.state,
            zip: Number(project.zip),
            lastmodified: moment().format('M/D/YY')
        },
        table: "projects"
    })
    .then((res) => {
        return res;
    });
}

function deleteProject(id) {
    return api.delete(`/api/projects/${id}`)
    .then((res) => {
        return Response;
    });
}

export {
    getProjects,
    getProjectsSearch,
    getProjectById,
    getProjectDesigns,
    postProject,
    putProject,
    deleteProject
}