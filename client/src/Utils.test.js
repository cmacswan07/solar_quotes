// var utils = require('./Utils');
// import utils from 'Utils';
import { sortRows, getEquipmentMap } from "Utils";

it('Returns a reverse sorted array of module items by property modulemake in reverse alphabetical order.', () => {
    var modules = [
        {
            modulemake: 'Apple',
            modulemodel:'Eric',
            voc: 1,
            vmp: 1,
            isc: 1,
            imp: 1,
            watts: 100
        },
        {
            modulemake: 'Beta',
            modulemodel:'Dog',
            voc: 2,
            vmp: 2,
            isc: 2,
            imp: 2,
            watts: 200
        },
        {
            modulemake: 'Cat',
            modulemodel:'Ceta',
            voc: 3,
            vmp: 3,
            isc: 3,
            imp: 3,
            watts: 300
        }, 
        {
            modulemake: 'Dog',
            modulemodel:'Bob',
            voc: 4,
            vmp: 4,
            isc: 4,
            imp: 4,
            watts: 400
        },
        {
            modulemake: 'Eric',
            modulemodel:'Apple',
            voc: 5,
            vmp: 5,
            isc: 5,
            imp: 5,
            watts: 500
        }
    ];

    var expectedResult = [
        {
            modulemake: 'Eric',
            modulemodel:'Apple',
            voc: 5,
            vmp: 5,
            isc: 5,
            imp: 5,
            watts: 500
        },
        {
            modulemake: 'Dog',
            modulemodel:'Bob',
            voc: 4,
            vmp: 4,
            isc: 4,
            imp: 4,
            watts: 400
        },
        {
            modulemake: 'Cat',
            modulemodel:'Ceta',
            voc: 3,
            vmp: 3,
            isc: 3,
            imp: 3,
            watts: 300
        }, 
        {
            modulemake: 'Beta',
            modulemodel:'Dog',
            voc: 2,
            vmp: 2,
            isc: 2,
            imp: 2,
            watts: 200
        },
        {
            modulemake: 'Apple',
            modulemodel:'Eric',
            voc: 1,
            vmp: 1,
            isc: 1,
            imp: 1,
            watts: 100
        }
    ];
    expect(modules.sort(sortRows("-modulemake"))).toMatchObject(expectedResult);
});

it('Returns a reverse sorted array of module items by property modulemake in reverse alphabetical order.', () => {
    var modules = [
        {
            modulemake: 'Apple',
            modulemodel:'Eric',
            voc: 1,
            vmp: 1,
            isc: 1,
            imp: 1,
            watts: 100
        },
        {
            modulemake: 'Beta',
            modulemodel:'Dog',
            voc: 2,
            vmp: 2,
            isc: 2,
            imp: 2,
            watts: 200
        },
        {
            modulemake: 'Cat',
            modulemodel:'Ceta',
            voc: 3,
            vmp: 3,
            isc: 3,
            imp: 3,
            watts: 300
        }, 
        {
            modulemake: 'Dog',
            modulemodel:'Bob',
            voc: 4,
            vmp: 4,
            isc: 4,
            imp: 4,
            watts: 400
        },
        {
            modulemake: 'Eric',
            modulemodel:'Apple',
            voc: 5,
            vmp: 5,
            isc: 5,
            imp: 5,
            watts: 500
        }
    ];

    var expectedResult = [
        {
            modulemake: 'Eric',
            modulemodel:'Apple',
            voc: 5,
            vmp: 5,
            isc: 5,
            imp: 5,
            watts: 500
        },
        {
            modulemake: 'Dog',
            modulemodel:'Bob',
            voc: 4,
            vmp: 4,
            isc: 4,
            imp: 4,
            watts: 400
        },
        {
            modulemake: 'Cat',
            modulemodel:'Ceta',
            voc: 3,
            vmp: 3,
            isc: 3,
            imp: 3,
            watts: 300
        }, 
        {
            modulemake: 'Beta',
            modulemodel:'Dog',
            voc: 2,
            vmp: 2,
            isc: 2,
            imp: 2,
            watts: 200
        },
        {
            modulemake: 'Apple',
            modulemodel:'Eric',
            voc: 1,
            vmp: 1,
            isc: 1,
            imp: 1,
            watts: 100
        }
    ];
    expect(modules.sort(sortRows("-voc"))).toMatchObject(expectedResult);
});

it('Should return an object where the keys are modulemakes and the values for each key is an array of model numbers', () => {
    var state = {
        modules: [
            { module_id: 1, modulemake: "Hanwha", modulemodel: "Q.Peak Duo-G5 320", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 320 },
            { module_id: 1, modulemake: "Hanwha", modulemodel: "Q.Peak Duo-G5 325", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 325 },
            { module_id: 1, modulemake: "Hanwha", modulemodel: "Q.Peak Duo-G5 330", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 330 },
            { module_id: 1, modulemake: "Hanwha", modulemodel: "Q.Peak Duo-G5 335", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 335 },
            { module_id: 1, modulemake: "Hanwha", modulemodel: "Q.Peak Duo-G5 340", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 340 },
            { module_id: 1, modulemake: "Hanwha", modulemodel: "Q.Peak Duo-G5 320", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 320 },
            { module_id: 1, modulemake: "Panasonic", modulemodel: "VBHN325SA16", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 325 },
            { module_id: 1, modulemake: "Panasonic", modulemodel: "VBHN330SA16", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 330 },
            { module_id: 1, modulemake: "Panasonic", modulemodel: "VBHN335SA16", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 335 },
            { module_id: 1, modulemake: "Panasonic", modulemodel: "VBHN340SA16", voc: 44, vmp: 44, isc: 44, imp: 44, watts: 340 },
        ]
    }

    var output = {
        Hanwha: ["Q.Peak Duo-G5 320", "Q.Peak Duo-G5 325", "Q.Peak Duo-G5 330", "Q.Peak Duo-G5 335", "Q.Peak Duo-G5 340"],
        Panasonic: ["VBHN325SA16", "VBHN330SA16", "VBHN335SA16", "VBHN340SA16"]
    }

    expect(getEquipmentMap(state.modules, "modulemake", "modulemodel")).toMatchObject(output);
});