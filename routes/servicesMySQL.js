const express = require('express');

const router = express.Router();

const validateData = require('../validation/serviceValidation');

const connection = require('../db/connection');

router.post('/createNewServiceMySQL', async (req, res) => {
    try {
        validateData(req.body);
        let userId = req.body.userId;
        let title = req.body.title;
        let description = req.body.description;
        let time = req.body.time;
        connection.query(`INSERT into services_Skipar (userId, title, description, services_time) values ('${userId}', '${title}', '${description}', '${time}')`, function (error, results) {
            if (error) {
                console.log('Can not insert');
                return res.status(err.status || 500).json(err);
            }
            return res.json(results);
        });
    }
    catch (err) {
        console.log('post', err);
        return res.status(err.status || 500).json(err);
    }
})

router.get('/allServicesMySQL', async (req, res) => {
    try {
        connection.query('select * from services_Skipar', function (error, results) {
            if (error) {
                console.log('Can not select');
                return res.status(err.status || 500).json(err);
            }
            return res.json(results);
        });
    }
    catch (err) {
        console.log('get services');
        return res.status(err.status || 500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id.toString();
        connection.query(`delete from services_Skipar where id = '${id}'`, function (error, results) {
            if (error) {
                console.log('Can not delete');
                return res.status(err.status || 500).json(err)
            }
            return res.json(results)
        })
    }
    catch (err) {
        console.log('delete services');
        return res.status(err.status || 500).json(err)
    }
});

router.put('/editServiceMySQL', async (req, res) => {
    try {
        validateData(req.body);
        let id = req.body.id;
        let userId = req.body.userId;
        let title = req.body.title;
        let description = req.body.description;
        let time = req.body.time;
        connection.query(`UPDATE services_Skipar SET userId = '${userId}', title = '${title}', description = '${description}', services_time = '${time}' WHERE id = '${id}' `, function (error, results) {
            if (error) {
                console.log('Can not update');
                return res.status(err.status || 500).json(err)
            }
            return res.json(results)
        })
    }
    catch (err) {
        console.log('delete services');
        return res.status(err.status || 500).json(err)
    }
})

module.exports = router;