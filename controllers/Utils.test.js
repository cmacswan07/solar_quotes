var Utils = require('./Utils');

// Validate fields.
it('Returns false when required fields are not the right data type', () => {
    // const moduleFields = ['modulemake', 'modulemodel', 'watts', 'voc', 'vmp', 'isc', 'imp'];

    const moduleFields = {
        modulemake: "string",
        modulemodel: "string",
        watts: "number",
        voc: "string",
        vmp: "number",
        isc: "number",
        imp: "number"
    }

    var body = {
        modulemake: 'canadian',
        modulemodel: 'solar',
        watts: 'aaa',
        voc: '33',
        vmp: '33',
        isc: '33',
        imp: '33'
    }

    expect(Utils.validateRequest(body, moduleFields)).toBe(false);
})

it('Returns true when required fields are present on req body', () => {
    // const projectFields = ['firstname', 'lastname', 'street', 'city', 'state', 'status', 'lastmodified'];

    const projectFields = {
        firstname: "string",
        lastname: "string",
        street: "string",
        city: "string",
        state: "string",
        status: "number",
        lastmodified: "string"
    }

    var body = {
        firstname: "Chris",
        lastname: "MacSwan",
        street: "7231 Piute Creek Dr.",
        city: "Corona",
        state: "CA",
        status: 2,
        lastmodified: "09/01/2020"
    }

    expect(Utils.validateRequest(body, projectFields)).toBe(true);
});

it('Returns false when required fields are not present on req body', () => {
    const projectFields = {
        firstname: "string",
        lastname: "string",
        street: "string",
        city: "string",
        state: "string",
        status: "number",
        lastmodified: "string"
    }

    var body = {
        lastname: "MacSwan",
        street: "7231 Piute Creek Dr.",
        city: "Corona",
        state: "CA",
        status: 2,
        lastmodified: "09/01/2020"
    }

    expect(Utils.validateRequest(body, projectFields)).toBe(false);
})

it('Returns false when required fields are empty', () => {
    // const projectFields = ['firstname', 'lastname', 'street', 'city', 'state', 'status', 'lastmodified'];

    const projectFields = {
        firstname: "string",
        lastname: "string",
        street: "string",
        city: "string",
        state: "string",
        status: "number",
        lastmodified: "string"
    }

    var body = {
        firstname: "",
        lastname: "MacSwan",
        street: "7231 Piute Creek Dr.",
        city: "Corona",
        state: "CA",
        status: 2,
        lastmodified: "09/01/2020"
    }

    expect(Utils.validateRequest(body, projectFields)).toBe(false);
});

it('Returns false when irrelevant properties are input', () => {
    // const projectFields = ['firstname', 'lastname', 'street', 'city', 'state', 'status', 'lastmodified'];

    const projectFields = {
        firstname: "string",
        lastname: "string",
        street: "string",
        city: "string",
        state: "string",
        status: "number",
        lastmodified: "string"
    }

    var body = {
        randoField: "Cheese",
        firstname: "test",
        lastname: "MacSwan",
        street: "7231 Piute Creek Dr.",
        city: "Corona",
        state: "CA",
        status: 2,
        lastmodified: "09/01/2020"
    }

    expect(Utils.validateRequest(body, projectFields)).toBe(false);
});

it('Returns false when nothing is input', () => {
    expect(Utils.validateRequest(null, null)).toBe(false);
});

// Insert Queries.

it('Returns a query that inserts a new row into the projects table', () => {
    var body = {
        firstname: "Max",
        lastname: "Payne",
        street: "421 Rexford St.",
        city: "Rialto",
        state: "CA",
        status: 1,
        lastmodified: "09/01/2020"
    }

    var table = "projects";

    expect(Utils.insertQuery(table, body, "project_id")).toBe(
        `INSERT INTO projects (firstname, lastname, street, city, state, status, lastmodified) 
        VALUES ('Max', 'Payne', '421 Rexford St.', 'Rialto', 'CA', '1', '09/01/2020') RETURNING project_id;`);
});

it('Returns a query that inserts a new row into the modules table', () => {
    var body = {
        modulemake: "Mission Solar",
        modulemodel: "MSE310SQ8T",
        voc: 40.12,
        vmp: 33.17,
        isc: 9.76,
        imp: 9.35,
        watts: 310
    }

    var table = "modules";

    expect(Utils.insertQuery(table, body, "module_id")).toBe(
        `INSERT INTO modules (modulemake, modulemodel, voc, vmp, isc, imp, watts) 
        VALUES ('Mission Solar', 'MSE310SQ8T', '40.12', '33.17', '9.76', '9.35', '310') RETURNING module_id;`);
});

it('Returns a query that inserts a new row into the inverters table', () => {
    var body = {
        invertermake: "Solaredge",
        invertermodel: "SE3800H-US",
        inverteroutput: 16,
        breaker: 20,
        inverterinput: 10.5,
        watts: 3800
    }

    var table = "inverters";

    expect(Utils.insertQuery(table, body, "inverter_id")).toBe(
        `INSERT INTO inverters (invertermake, invertermodel, inverteroutput, breaker, inverterinput, watts) 
        VALUES ('Solaredge', 'SE3800H-US', '16', '20', '10.5', '3800') RETURNING inverter_id;`);
});

// Update strings

it('Returns a update query string for multiple columns', () => {
    var body = {
        modulemake: "Solarworld",
        modulemodel: "SW250",
        voc: 33,
        vmp: 33,
        isc: 33,
        imp: 33
    };
    var table = "modules";
    var id = 26;
    var idType = "module_id";

    expect(Utils.updateQuery(id, idType, table, body)).toBe("UPDATE modules SET modulemake = 'Solarworld', modulemodel = 'SW250', voc = 33, vmp = 33, isc = 33, imp = 33 WHERE module_id=26");
});

it('Returns a update query string for multiple columns', () => {
    var body = {
        modulemake: "Solarworld",
        modulemodel: "SW250"
    };
    var table = "modules";
    var id = 26;
    var idType = "module_id";

    expect(Utils.updateQuery(id, idType, table, body)).toBe("UPDATE modules SET modulemake = 'Solarworld', modulemodel = 'SW250' WHERE module_id=26");
});

it('Returns a update query string for one column', () => {
    var body = {
        modulemake: "Solarworld"
    };
    var table = "modules";
    var id = 26;
    var idType = "module_id";

    expect(Utils.updateQuery(id, idType, table, body)).toBe("UPDATE modules SET modulemake = 'Solarworld' WHERE module_id=26");
});

it('Returns a select all statement when no queries are present', () => {
    var queries = {};
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules");
});

it('Returns a search query statement when queries are present', () => {
    var queries = {
        modulemake: "Hanwha",
        modulemodel: "QCell",
        modulepower: 33
    }
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules WHERE modulemake::text ILIKE '%Hanwha%' AND modulemodel::text ILIKE '%QCell%' AND modulepower::text ILIKE '%33%'");
});

it('Excludes a column if the query property is empty', () => {
    var queries = {
        modulemake: '',
        modulemodel: "QCell",
        modulepower: 33
    }
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules WHERE modulemodel::text ILIKE '%QCell%' AND modulepower::text ILIKE '%33%'");
});

it('Excludes a column if the query property is empty', () => {
    var queries = {
        modulemake: 'Hanwha',
        modulemodel: ''
    }
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules WHERE modulemake::text ILIKE '%Hanwha%'");
});

it('Returns a search query with just 1 query field', () => {
    var queries = {
        modulemake: 'Hanwha'
    }
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules WHERE modulemake::text ILIKE '%Hanwha%'");
});

it('Returns a select all statement when all query properties are empty', () => {
    var queries = {
        modulemake: "",
        modulemodel: "",
        watts: ""
    };
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules");
});

it('Returns a select query with populated and unpopulated properties', () => {
    var queries = {
        modulemake: "Hanwha",
        modulemodel: "",
        watts: "320"
    };
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules WHERE modulemake::text ILIKE '%Hanwha%' AND watts::text ILIKE '%320%'");
});

it('Returns a select query with populated and unpopulated properties', () => {
    var queries = {
        modulemake: "test",
        modulemodel: "test",
        watts: ""
    };
    var table = "modules";

    expect(Utils.getQuery(queries, table)).toBe("SELECT * FROM modules WHERE modulemake::text ILIKE '%test%' AND modulemodel::text ILIKE '%test%'");
});