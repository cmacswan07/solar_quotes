// Dependencies.
const express = require('express');
const app = express();
const pool = require('../config').pool;
const Joi = require('@hapi/joi');
const validate = require('express-joi-validate');
const passport = require('../passport/config');

const idSchema = {
    params: {
        id: Joi.number().required()
    }
};

const designIdSchema = {
    params: {
        id: Joi.number().required(),
        design_id: Joi.number().required()
    }
}

// Controllers.
const projectsController = require('../controllers/ProjectsController');
const modulesController = require('../controllers/ModulesController');
const invertersController = require('../controllers/InvertersController');
const designsController = require('../controllers/DesignsController');
const authController = require('../controllers/AuthController');

// Project routes.
app.get('/api/projects', projectsController.getProjects);
app.get('/api/projects/:id', validate(idSchema), projectsController.getProjects);
app.post('/api/projects', projectsController.postProject);
app.put('/api/projects/:id', validate(idSchema), projectsController.putProject);
app.delete('/api/projects/:id', validate(idSchema), projectsController.deleteProject);

// Module routes.
app.get('/api/modules', modulesController.getModules);
app.get('/api/modules/:id', validate(idSchema), modulesController.getModules);
app.post('/api/modules', modulesController.postModule);
app.put('/api/modules/:id', validate(idSchema), modulesController.putModule);
app.delete('/api/modules/:id', validate(idSchema), modulesController.deleteModule);

// Inverter routes.
app.get('/api/inverters', invertersController.getInverters);
app.get('/api/inverters/:id', validate(idSchema), invertersController.getInverters);
app.post('/api/inverters', invertersController.postInverter);
app.put('/api/inverters/:id', invertersController.putInverter);
app.delete('/api/inverters/:id', validate(idSchema), invertersController.deleteInverter);

// Design routes
app.get('/api/projects/:id/designs', validate(idSchema), designsController.getDesigns);
app.get('/api/projects/:id/designs/:design_id', validate(designIdSchema), designsController.getDesigns);
app.post('/api/projects/:id/designs', validate(idSchema), designsController.postDesign);
app.put('/api/projects/:id/designs/:design_id', validate(designIdSchema), designsController.putDesign);
app.delete('/api/projects/:id/designs/:design_id', validate(designIdSchema), designsController.deleteDesign);

// Auth routes
app.post('/api/users', authController.createUser);
app.post('/api/login', passport.authenticate('local'), authController.logIn);
app.get('/api/user', authController.getUser);
app.get('/api/logout', authController.logOut);

module.exports = app;