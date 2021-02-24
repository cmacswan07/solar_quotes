import api from 'api';

function getModules() {
    return api.get('/api/modules')
    .then((res) => {
        return res.data;
    });
}

function getModulesSearch(search) {
    return api.get('/api/modules', {
        params: search
    })
    .then((res) => { 
        return res.data 
    });
}

function getModulesByMakeModel(search) {
    return api.get('/api/modules', {
        params: search
    })
    .then((res) => {
        return res.data;
    });
}

function getModuleById(id) {
    return api.get(`/api/modules/${id}`)
    .then((res, reject) => {
        if (res.data.length < 1) {
            return reject();
        } else {
            var module = res.data[0];
            var moduleObj = {
                modulemake: module.modulemake,
                modulemodel: module.modulemodel,
                watts: module.watts,
                voc: module.voc,
                vmp: module.vmp,
                isc: module.isc,
                imp: module.imp
            }
            return moduleObj;
        }
    });
}

function postModule(module) {
    return api.post('/api/modules', {
        modulemake: module.modulemake,
        modulemodel: module.modulemodel,
        watts: Number(module.watts),
        voc: Number(module.voc),
        vmp: Number(module.vmp),
        isc: Number(module.isc),
        imp: Number(module.imp)
    })
    .then((res, reject) => {
        if (res.data == 'Invalid request body') {
            return reject();
        } else {
            return res.data
        }
    });
}

function putModule(module, id) {
    return api.put(`/api/modules/${id}`, {
        table: "modules",
        module: {
            modulemake: module.modulemake,
            modulemodel: module.modulemodel,
            watts: Number(module.watts),
            voc: Number(module.voc),
            vmp: Number(module.vmp),
            isc: Number(module.isc),
            imp: Number(module.imp)
        }
    })
    .then((res, reject) => {
        if (res.data == 'Invalid request body') {
            return reject();
        } else {
            return res.data
        }
    });
}

function deleteModule(id) {
    return api.delete(`/api/modules/${id}`)
    .then((response) => {
        return response;
    });
}

export {
    getModules,
    getModulesSearch,
    getModuleById,
    postModule,
    putModule,
    deleteModule,
    getModulesByMakeModel
}