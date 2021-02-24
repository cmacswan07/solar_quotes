// import getUser from 'auth-api';
import { getUser } from 'auth-api';

function sortRows(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }    
}

function getEquipmentMap(equipment, makeField, modelField) {
    var moduleMakeMap = {};

    for (var i = 0; i < equipment.length; i++) {
        if (equipment[i][makeField] && !moduleMakeMap[equipment[i][makeField]]) {
            moduleMakeMap[equipment[i][makeField]] = [];
        }
    }

    for (var j = 0; j < equipment.length; j++) {
        if (moduleMakeMap[equipment[j][makeField]] && moduleMakeMap[equipment[j][makeField]].indexOf(equipment[j][modelField]) < 0) {
            moduleMakeMap[equipment[j][makeField]].push(equipment[j][modelField]);
        }
    }

    return moduleMakeMap;
}

function getEquipmentMakes(equipmentMap) {
    return false;
}

function isAuthenticated() {
    return getUser();
}

export {
    sortRows,
    getEquipmentMap,
    getEquipmentMakes,
    isAuthenticated
}