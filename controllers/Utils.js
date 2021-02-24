class Utils {
    // validators, methods that insert, etc.
    static validateRequest(body, fields) {
        if (!fields || !body) {
            return false;
        }

        for (var prop in body) {
            if (!fields.hasOwnProperty(prop)) {
                return false;
            }
        }

        for (var prop in fields) {
            if (!body.hasOwnProperty(prop) || body[prop].length < 1 || typeof(body[prop]) !== fields[prop]) {
                return false;
            }
        }
        return true;
    }

    // takes a table name and a request body and returns a query string.
    static insertQuery(table, body, idType) {
        var columns = "";
        var values = "";
        var bodyProps = Object.keys(body);

        for (var i = 0; i < bodyProps.length; i++) {
            if (i < bodyProps.length - 1) {
                columns += bodyProps[i] + ', ';
            } else {
                columns += bodyProps[i]
            }
        }

        for (var i = 0; i < bodyProps.length; i++) {
            if (i < bodyProps.length - 1) {
                values += `'${body[bodyProps[i]]}', `;
            } else {
                values += `'${body[bodyProps[i]]}'`;
            }
        }

        return `INSERT INTO ${table} (${columns}) 
        VALUES (${values}) RETURNING ${idType};`
    }

    // takes a table name and a request body and returns a query string.
    static insertGetIdQuery(table, body, idColumn) {
        var columns = "";
        var values = "";
        var bodyProps = Object.keys(body);

        for (var i = 0; i < bodyProps.length; i++) {
            if (i < bodyProps.length - 1) {
                columns += bodyProps[i] + ', ';
            } else {
                columns += bodyProps[i]
            }
        }

        for (var i = 0; i < bodyProps.length; i++) {
            if (i < bodyProps.length - 1) {
                values += `'${body[bodyProps[i]]}', `;
            } else {
                values += `'${body[bodyProps[i]]}'`;
            }
        }

        return `INSERT INTO ${table} (${columns}) 
        VALUES (${values}) RETURNING ${idColumn};`
    }

    // update query.

    static updateQuery(id, idType, table, body) {
        var columns = Object.keys(body);
        var queryStr = `UPDATE ${table} SET `;
        for (var i = 0 ; i < columns.length - 1; i++) {
            queryStr += columns[i] + (
                typeof(body[columns[i]]) == 'string' ? 
                    " = '" + body[columns[i]] + "', " :
                    " = " + body[columns[i]] + ", "
            );
        }
        queryStr += 
            columns[i] + (
                typeof(body[columns[i]]) == 'string' ? 
                    " = '" + body[columns[i]] + "' " :
                    " = " + body[columns[i]] + " "
            ) + 
            `WHERE ${idType}=${id}`
        return queryStr;
    }

    static getQuery(queryObj, table) {
        if (Object.keys(queryObj).length < 1) {
            return `SELECT * FROM ${table}`;
        } else {
            var columns = Object.keys(queryObj);
            var query = `SELECT * FROM ${table}`
            var j = 0;
            while (j < columns.length) {
                if (queryObj[columns[j]].toString().length < 1) {
                    columns.splice(j, 1);
                } else {
                    j++;
                }
            }

            if (columns.length > 0) {
                query += " WHERE ";
            }

            for (var i = 0; i < columns.length; i++) {
                if (i < columns.length - 1) {
                    query += columns[i] + '::text ' + 'ILIKE ' + `'%${queryObj[columns[i]]}%' AND `;
                } else {
                    query += columns[i] + '::text ' + 'ILIKE ' + `'%${queryObj[columns[i]]}%'`;
                }
            }
            console.log(query);
            return query;
        }
    }
}

module.exports = Utils;