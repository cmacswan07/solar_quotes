const { pool } = require("../config");
const utils = require('./Utils');

const designFields = {
    project_id: "number",
    module_id: "number",
    module_qty: "number",
    inverter_id: "number",
    inverter_qty: "number",
    roof_framing: "string",
    roof_material: "string",
    panelupgrade: "boolean",
    mainpanel: "number",
    mainbreaker: "number",
    name: "string",
    module: "string",
    inverter: "string"
};

const tables = ['modules', 'inverters', 'projects', 'designs'];

exports.getDesigns = function(req, res) {
    console.log(req.params);
    if (req.params.design_id) {
        pool.query(`SELECT * FROM designs WHERE design_id=${req.params.design_id} AND project_id=${req.params.id}`)
        .then((queryRes) => { res.send(queryRes.rows); });
    } else if (req.params.id) {
        pool.query(`SELECT * FROM designs WHERE project_id=${req.params.id}`)
        .then((queryRes) => { res.send(queryRes.rows); });
    }
}

exports.postDesign = function(req, res) {
    console.log(req.body);
    if (utils.validateRequest(req.body, designFields)) {
        pool.query(utils.insertQuery("designs", req.body, "design_id"))
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send("Invalid request body");
    }
}

exports.putDesign = function(req, res) {
    console.log("PUT route")
    console.log(req.body.design);
    if (utils.validateRequest(req.body.design, designFields) && tables.indexOf(req.body.table) > -1) {
        console.log("Request validated");
        pool.query(utils.updateQuery(req.params.design_id, "design_id", "designs", req.body.design))
        .then((queryRes) => {
            console.log("DB queried");
            res.send(queryRes);
        });
    }
}

exports.deleteDesign = function(req, res) {
    if (req.params.id) {
        pool.query(`DELETE FROM designs WHERE design_id=${req.params.design_id}`)
        .then((queryRes) => {
            res.send(queryRes);
        });
    } else {
        res.send(false);
    }
}