const express = require('express');
const fs = require('fs');

const router = express.Router();
/* TODO (ЗАПИТАННЯ):
1. Яка має бути валідація при router.get?
2. Як у перевірити, чи таке id є?
3. Якщо під час валідації виникає проблема, то виводить порожній об'єкт, а не назву помилки. Чому так? Не розумію.
*/
const validateData = require('../validation/userValidation');

router.post('/createNewUser', async (req, res) => {
    try {
        validateData(req.body);
        const usersJSON = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'))
        let users = usersJSON.users;
        console.log('users', users)
        let newUser = {};
        newUser.name = req.body.name;
        newUser.id = Math.random();
        newUser.city = req.body.city;
        users.push(newUser)
        usersJSON.users = users;
        fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
        return res.json(users)
    }
    catch (err) {
        console.log('post');
        return res.status(err.status || 500).json(err);

    }
});


router.get('/allUsers', async (req, res) => {
    try {
        const usersJSON = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'));
        return res.json(usersJSON)
    }
    catch (err) {
        console.log('get');
        return res.status(err.status || 500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        validateData(req.params.id); 
        const usersJSON = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'))
        let users = usersJSON.users;
        let id = req.params.id.toString();
        usersJSON.users = users.filter(u => u.id.toString() !== id);
        fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
        return res.json(usersJSON.users)
    }
    catch (err) {
        console.log('delete');
        return res.status(err.status || 500).json(err);

    }
});


router.put('/editUser', async (req, res) => {
    try {
        validateData(req.body);
        let id = req.body.id;
        let name = req.body.name;
        let city = req.body.city;
        const usersJSON = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'))
        let users = usersJSON.users;
        let editedUser = {};
        editedUser = users.filter(u => u.id.toString() == id.toString());
        notEditedUsers = users.filter(u => u.id.toString() !== id.toString());
        console.log('beforebefore', editedUser);
        if (editedUser.length > 0){
            console.log('before', editedUser);
            editedUser = {
                id: id,
                name: name,
                city: city
            };
            console.log('after', editedUser)
            notEditedUsers.push(editedUser)
        }
        usersJSON.users = notEditedUsers;
        fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
        return res.json(notEditedUsers);
    }
    catch (err) {
        console.log('put');
        return res.status(err.status || 500).json(err);

    }
});



module.exports = router;