import api from 'api';
import { getModuleById, getModules, getModulesByMakeModel } from 'modules/module-api';
import { getInverterById, getInverters, getInvertersByMakeModel } from 'inverters/inverter-api';
import { getProjectById } from 'projects/project-api';
import { getEquipmentMap } from 'Utils';

function getDesignById(projectId, designId) {
    var responseObj = {
        project: {},
        design: {},
        inputs: {},
        module: {},
        inverter: {},
        modules: [],
        inverters: [],
        modulesMap: {},
        moduleMakes: [],
        moduleModels: [],
        invertersMap: {},
        inverterMakes: [],
        inverterModels: [],
    };

    return api.get(`/api/projects/${projectId}/designs/${designId}`)
    .then((res, reject) => {
        if (res.data.length < 1) {
            return reject();
        } else {
            var design = res.data[0];
            responseObj.design = {
                designId: design.design_id,
                projectId: design.project_id,
                moduleId: design.module_id,
                moduleQty: design.module_qty,
                inverterId: design.inverter_id,
                inverterQty: design.inverter_qty,
                roofFraming: design.roof_framing,
                roofMaterial: design.roof_material,
                panelUpgrade: design.panelupgrade,
                mainPanel: design.mainpanel,
                mainBreaker: design.mainbreaker,
                designName: design.name,
                module: design.module,
                inverter: design.inverter
            }
            responseObj.inputs = {
                designField: design.name,
                moduleQtyField: design.module_qty,
                inverterQtyField: design.inverter_qty,
                panelUpgradeField: design.panelupgrade,
                mainBreakerField: design.mainbreaker,
                mainPanelField: design.mainpanel,
                roofFramingField: design.roof_framing,
                roofMaterialField: design.roof_material
            }
            return getModuleById(responseObj.design.moduleId);
        }
    })
    .then((res) => {
        responseObj.module = res;
        return getInverterById(responseObj.design.inverterId);
    })
    .catch(() => {
        responseObj.module = {
            modulemake: 'Deleted module!',
            modulemodel: 'Deleted module!',
            watts: 0,
            voc: 0,
            vmp: 0,
            isc: 0,
            imp: 0
        }
        return getInverterById(responseObj.design.inverterId);
    })
    .then((res) => {
        responseObj.inverter = res;
        return getProjectById(responseObj.design.projectId);
    })
    .catch(() => {
        responseObj.inverter = {
            invertermake: 'Deleted Inverter!',
            invertermodel: 'Deleted Inverter!',
            inverteroutput: 0,
            breaker: 0,
            inverterinput: 0,
            watts: 0,
            inverterType: 'optimizer'
        }
        return getProjectById(responseObj.design.projectId);
    })
    .then((res, reject) => {
        if (!res) {
            return reject();
        }
        responseObj.project = res;
        return getModules();
    })
    .then((res) => {
        responseObj.modules = res;
        responseObj.modulesMap = getEquipmentMap(res, "modulemake", "modulemodel");
        for (var prop in responseObj.modulesMap) {
            responseObj.moduleMakes.push(prop);
        }
        responseObj.moduleModels = responseObj.modulesMap[responseObj.module.modulemake];
        return getInverters();
    })
    .then((res) => {
        responseObj.inverters = res;
        responseObj.invertersMap = getEquipmentMap(res, "invertermake", "invertermodel");
        for (var prop in responseObj.invertersMap) {
            responseObj.inverterMakes.push(prop);
        }
        responseObj.inverterModels = responseObj.invertersMap[responseObj.inverter.invertermake];
        return responseObj;
    })
    .then((res) => {
        return res;
    })
}

function putDesign(inputs, projectId, designId) {
    var moduleId = 0;
    var inverterId = 0;
    return api.get('/api/modules', {
        params: {
            modulemake: inputs.selectedModuleMake,
            modulemodel: inputs.selectedModuleModel,
            exactMatch: true
        }
    })
    .then((res, reject) => {
        moduleId = res.data[0].module_id;
        return api.get('/api/inverters', {
            params: {
                invertermake: inputs.selectedInverterMake,
                invertermodel: inputs.selectedInverterModel
            }
        });
    })
    .then((res) => {
        inverterId = res.data[0].inverter_id;
        return api.put(`/api/projects/${projectId}/designs/${designId}`, {
            table: "designs",
            design: {
                project_id: Number(projectId),
                module_id: Number(moduleId),
                module_qty: Number(inputs.moduleQtyField),
                inverter_id: Number(inverterId),
                inverter_qty: Number(inputs.inverterQtyField),
                roof_framing: inputs.roofFramingField,
                roof_material: inputs.roofMaterialField,
                panelupgrade: (inputs.panelUpgradeField == 'true'),
                mainpanel: Number(inputs.mainPanelField),
                mainbreaker: Number(inputs.mainBreakerField),
                name: inputs.designField,
                module: inputs.selectedModuleMake + ' ' + inputs.selectedModuleModel,
                inverter: inputs.selectedInverterMake + ' ' + inputs.selectedInverterModel
            }
        })
    })
}

function deleteDesign(projectId, designId) {
    return api.delete(`/api/projects/${projectId}/designs/${designId}`)
}

function postDesign(projectData, projectId) {
    var moduleId = 0;
    var inverterId = 0;

    var module = {
        modulemake: projectData.selectedModuleMake,
        modulemodel: projectData.selectedModuleModel
    }

    var inverter = {
        invertermake: projectData.selectedInverterMake,
        invertermodel: projectData.selectedInverterModel
    }

    return getModulesByMakeModel(module)
    .then((res, reject) => {
        console.log("res", res);
        if (res.length > 0) {
            console.log("res 2");
            moduleId = res[0].module_id;
            return getInvertersByMakeModel(inverter);
        } else {
            console.log("module id catch");
            reject();
        }
    })
    .then((res, reject) => {
        if (res.length > 0) {
            inverterId = res[0].inverter_id;
            return api.post(`/api/projects/${projectId}/designs`, {
                project_id: Number(projectId),
                module_id: Number(moduleId),
                module_qty: Number(projectData.moduleQty),
                inverter_id: Number(inverterId),
                inverter_qty: Number(projectData.inverterQty),
                roof_framing: projectData.roofFraming,
                roof_material: projectData.roofMaterial,
                panelupgrade: (projectData.panelUpgrade == 'true'),
                mainpanel: Number(projectData.mainPanel),
                mainbreaker: Number(projectData.mainBreaker),
                name: projectData.designName,
                module: projectData.selectedModuleMake + ' ' + projectData.selectedModuleModel,
                inverter: projectData.selectedInverterMake + ' ' + projectData.selectedInverterModel
            })
        } else {
            console.log("invert id catch");
            reject();
        }
    })
}

function getProjectModulesInverters(projectData) {
    var resObj = {};
    return getProjectById(projectData.id)
    .then((res, reject) => {
        if (!res) {
            return reject();
        }
        resObj.project = res;
        return getModules();
    })
    .then((res) => {
        resObj.modules = res;
        resObj.modulesMap = getEquipmentMap(res, "modulemake", "modulemodel");
        resObj.moduleMakes = [];
        resObj.moduleModels = [];
        for (var prop in resObj.modulesMap) {
            resObj.moduleMakes.push(prop);
        }
        resObj.moduleModels = resObj.modulesMap[resObj.moduleMakes[0]];
        return getInverters();
    })
    .then((res) => {
        resObj.inverters = res;
        resObj.invertersMap = getEquipmentMap(res, "invertermake", "invertermodel");
        resObj.inverterMakes = [];
        resObj.inverterModels = [];
        for (var prop in resObj.invertersMap) {
            resObj.inverterMakes.push(prop);
        }
        resObj.inverterModels = resObj.invertersMap[resObj.inverterMakes[0]];
        return resObj;
    });
}

export {
    getDesignById,
    putDesign,
    deleteDesign,
    postDesign,
    getProjectModulesInverters
}