import api from 'api';

function getInverters() {
    return api.get('/api/inverters')
    .then((response) => { return response.data });
}

function getInvertersSearch(search) {
    return api.get('/api/inverters', {
        params: search
    })
    .then((res) => {
        return res.data;
    });
}

function getInvertersByMakeModel(search) {
    return api.get('/api/inverters', {
        params: search
    })
    .then((res) => {
        return res.data;
    });
}

function getInverterById(id) {
    return api.get(`/api/inverters/${id}`)
    .then((res, reject) => {
        if (res.data.length < 1) {
            return reject();
        } else {
            var inverter = res.data[0];
            var inverterObj = {
                invertermake: inverter.invertermake,
                invertermodel: inverter.invertermodel,
                watts: inverter.watts,
                output: inverter.inverteroutput,
                breaker: inverter.breaker,
                input: inverter.inverterinput,
                invertertype: inverter.invertertype
            }
            return inverterObj;
        }
    });
}

function postInverter(inverter) {
    return api.post('/api/inverters', {
        invertermake: inverter.invertermake,
        invertermodel: inverter.invertermodel,
        inverteroutput: Number(inverter.output),
        breaker: Number(inverter.breaker),
        watts: Number(inverter.watts),
        inverterinput: Number(inverter.input),
        invertertype: inverter.invertertype.toLowerCase()
    })
    .then((res, reject) => {
        if (res.data == 'Invalid request body') {
            return reject();
        } else {
            return res.data
        }
    });
}

function putInverter(inverter, id) {
    return api.put(`/api/inverters/${id}`, {
        table: "inverters",
        inverter: {
            invertermake: inverter.invertermake,
            invertermodel: inverter.invertermodel,
            inverteroutput: Number(inverter.output),
            breaker: Number(inverter.breaker),
            watts: Number(inverter.watts),
            inverterinput: Number(inverter.input),
            invertertype: inverter.invertertype.toLowerCase()
        }
    })
    .then((res, reject) => {
        if (res.data == 'Invalid request body') {
            return reject();
        } else {
            return res.data;
        }
    });
}

function deleteInverter(id) {
    return api.delete(`/api/inverters/${id}`)
    .then(res => {
        return res;
    });
}

export {
    getInverters,
    getInverterById,
    getInvertersSearch,
    postInverter,
    putInverter,
    deleteInverter,
    getInvertersByMakeModel
}