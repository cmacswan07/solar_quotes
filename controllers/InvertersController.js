const pool = require('../config').pool;
const utils = require('./Utils');

const inverterFields = {
    invertermake: "string",
    invertermodel: "string",
    inverteroutput: "number",
    breaker: "number",
    inverterinput: "number",
    watts: "number",
    invertertype: "string"
}

const tables = ['modules', 'inverters', 'projects'];

exports.getInverters = function(req, res) {
    console.log(req.query);
    if (req.params.id) {
        pool.query(`SELECT * from inverters WHERE inverter_id=${req.params.id}`)
        .then((queryRes) => { res.send(queryRes.rows); })
    } else if (req.query.invertermake && req.query.invertermodel && req.query.exactMatch) {
        pool.query(`SELECT inverter_id FROM inverters WHERE invertermake='${req.query.invertermake}' AND invertermodel='${req.query.invertermodel}'`)
        .then((queryRes) => { res.send(queryRes.rows) });
    } else {
        pool.query(utils.getQuery(req.query, "inverters"))
        .then((queryRes) => { res.send(queryRes.rows); });
    }
}

exports.postInverter = function(req, res) {
    if (utils.validateRequest(req.body, inverterFields)) {
        pool.query(utils.insertQuery("inverters", req.body, "inverter_id"))
        .then((queryRes) => {
            res.send(queryRes);
        })
    } else {
        res.send("Invalid request body");
    }
}

exports.putInverter = function(req, res) {
    if (utils.validateRequest(req.body.inverter, inverterFields) && tables.indexOf(req.body.table) > -1) {
        pool.query(utils.updateQuery(req.params.id, "inverter_id", req.body.table, req.body.inverter))
        .then((queryRes) => { 
            res.send(queryRes); 
        });
    } else {
        res.send("Invalid request");
    }
}

exports.deleteInverter = function(req, res) {
    if (req.params.id) {
        pool.query(`DELETE FROM inverters WHERE inverter_id=${req.params.id}`)
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send(false);
    }
}