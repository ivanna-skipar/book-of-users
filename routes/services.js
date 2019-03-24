const express = require('express');
const fs = require('fs');
const router = express.Router();

const validateData = require('../validation/serviceValidation');


router.post('/createNewService', async (req, res) => {
    try {
        validateData(req.body);
        const servicesJSON = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'))
        let services = servicesJSON.services;
        console.log('services ->', servicesJSON.services)
        let newService = {};
        console.log('before', newService)
        newService.id = Math.random();
        newService.userId = req.body.userId;
        newService.title = req.body.title;
        newService.description = req.body.description;
        newService.time = req.body.time;
        console.log('after', newService);
        services.push(newService);
        servicesJSON.services = services;
        fs.writeFileSync('./db/services.json', JSON.stringify(servicesJSON));
        return res.json(services)
    }
    catch (err) {
        console.log('post');
        return res.status(err.status || 500).json(err);

    }
})

router.get('/allServices', async (req, res) => {
    try {
        const servicesJSON = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'));
        return res.json(servicesJSON)
    }
    catch (err) {
        console.log('get services');
        return res.status(ere.status || 500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        validateData(req.params.id);
        const servicesJSON = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'));
        let services = servicesJSON.services;
        console.log('services', services);
        let id = req.params.id.toString();
        servicesJSON.services = services.filter(s => s.id.toString() !== id);
        fs.writeFileSync('./db/services.json', JSON.stringify(servicesJSON));
        return res.json(servicesJSON.services)
    }
    catch (err) {
        console.log('delete service');
        return res.status(err.status || 500).json(err);
    }
})

router.put('/editService', async (req, res) => {
    try {
        validateData(req.body);
        let id = req.body.id;
        let userId = req.body.userId;
        let title = req.body.title;
        let description = req.body.description;
        let time = req.body.time;
        const servicesJSON = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'));
        let services = servicesJSON.services;
        console.log('services', services);
        let editedService = {};
        editedService = services.filter(s => s.id.toString() == id.toString());
        console.log('editedService', editedService)
        notEditedService = services.filter(s => s.id.toString() !== id.toString());
        console.log('notEditedService', notEditedService);
        if (editedService.length > 0) {
            editedService = {
                id : id,
                userId : userId,
                title : title,
                description : description,
                time : time
            }
            notEditedService.push(editedService)
        }
        servicesJSON.services = notEditedService;
        fs.writeFileSync('./db/services.json', JSON.stringify(servicesJSON));
        return res.json(notEditedService)
    }
    catch (err){
        console.log('put services');
        return res.status(err.status || 500).json(err);
    }
})

module.exports = router;