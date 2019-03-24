const express = require('express');

const router = express.Router();

const validateData = require('../validation/userValidation');

const connection = require('../db/connection');

router.post('/createNewUserMySQL', async (req, res) => {
    try {
        validateData(req.body);
        let name = req.body.name;
        let city = req.body.city;
        connection.query(`INSERT into users_Skipar (firstName, city) values ('${name}', '${city}')`, function (error, results) {
            if (error) {
                console.log('Can not insert');
                return res.status(err.status || 500).json(err);
            }
            return res.json(results);
        });
    }
    catch (err) {
        console.log('post');
        return res.status(err.status || 500).json(err);
    }
});


router.get('/allUsersMySQL', async (req, res) => {
    try {
        connection.query('select * from users_Skipar', function (error, results) {
            if (error) {
                console.log('Can not select');
                return res.status(err.status || 500).json(err);
            }
            return res.json(results);
        });
    }
    catch (err) {
        console.log('get');
        return res.status(err.status || 500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id.toString();
        connection.query(`delete from users_Skipar where id = '${id}'`, function (error, results) {
            if (error) {
                console.log('Can not delete');
                return res.status(err.status || 500).json(err)
            }
            return res.json(results)
        })
    }
    catch (err) {
        console.log('delete');
        return res.status(err.status || 500).json(err);

    }
});


router.put('/editUserMySQL', async (req, res) => {
    try {
        validateData(req.body);
        let id = req.body.id;
        let name = req.body.name;
        let city = req.body.city;
        connection.query(`UPDATE users_Skipar SET firstName = '${name}', city = '${city}' WHERE id = '${id}' `, function (error, results) {
            if (error) {
                console.log('Can not update');
                return res.status(err.status || 500).json(err)
            }
            return res.json(results)
        })
    }
    catch (err) {
        console.log('put');
        return res.status(err.status || 500).json(err);

    }
});

module.exports = router;