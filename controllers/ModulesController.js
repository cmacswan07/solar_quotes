const pool = require('../config').pool;
const utils = require('./Utils');

const moduleFields = {
    modulemake: "string",
    modulemodel: "string",
    watts: "number",
    voc: "number",
    vmp: "number",
    isc: "number",
    imp: "number"
}

const tables = ['modules', 'inverters', 'projects'];

exports.getModules = function(req, res) {
    if (req.params.id) {
        pool.query(`SELECT * from modules WHERE module_id=${req.params.id}`)
        .then((queryRes) => { res.send(queryRes.rows); })
    } else if (req.query.modulemake && req.query.modulemodel && req.query.exactMatch) {
        pool.query(`SELECT module_id FROM modules WHERE modulemake='${req.query.modulemake}' AND modulemodel='${req.query.modulemodel}'`)
        .then((queryRes) => { res.send(queryRes.rows) });
    } else {
        pool.query(utils.getQuery(req.query, "modules"))
        .then((queryRes) => { res.send(queryRes.rows); });
    }
}

exports.postModule = function(req, res) {
    if (utils.validateRequest(req.body, moduleFields)) {
        pool.query(utils.insertQuery("modules", req.body, "module_id"))
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send("Invalid request body");
    }
}

exports.putModule = function(req, res) {
    if (utils.validateRequest(req.body.module, moduleFields) && tables.indexOf(req.body.table) > -1) {
        pool.query(utils.updateQuery(req.params.id, "module_id", req.body.table, req.body.module))
        .then((queryRes) => { 
            res.send(queryRes);
        });
    } else {
        res.send("Invalid request");
    }
}

exports.deleteModule = function(req, res) {
    if (req.params.id) {
        pool.query(`DELETE FROM modules WHERE module_id=${req.params.id}`)
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send(false);
    }
}