const pool = require('../config').pool;
const utils = require('./Utils');

const projectFields = {
    firstname: "string",
    lastname: "string",
    street: "string",
    city: "string",
    state: "string",
    zip: "number",
    lastmodified: "string"
}

const tables = ['modules', 'inverters', 'projects'];

exports.getProjects = function(req, res) {
    if (req.params.id) {
        console.log(typeof(Number(req.params.id)));
        pool.query(`SELECT * from projects WHERE project_id=${req.params.id}`)
        .then((queryRes) => { res.send(queryRes.rows); })
    } else {
        pool.query(utils.getQuery(req.query, "projects"))
        .then((queryRes) => { res.send(queryRes.rows); });
    }
}

exports.postProject = function(req, res) {
    if (utils.validateRequest(req.body, projectFields)) {
        pool.query(utils.insertQuery('projects', req.body, "project_id"))
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send("Invalid request body");
    }
}

exports.putProject = function(req, res) {
    console.log("put received");
    console.log(req.body.project, projectFields);
    if (utils.validateRequest(req.body.project, projectFields) && tables.indexOf(req.body.table) > -1) {
        pool.query(utils.updateQuery(req.params.id, "project_id", req.body.table, req.body.project))
        .then((queryRes) => { 
            res.send(queryRes);
        });
    } else {
        res.send("Invalid request");
    }
}

exports.deleteProject = function(req, res) {
    if (req.params.id) {
        pool.query(`DELETE FROM projects WHERE project_id=${req.params.id}`)
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send(false);
    }
}