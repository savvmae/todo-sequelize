const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/edit/:id', async (request, response) => {
    var id = request.params.id;
    var result = await models.todoList.find({
            where: {
                id: id
            }
        });
    response.render('edit', {todoList: result});
});

router.post('/edit/:id', async (request, response) => {
    var updatedItem = request.body.editItem;
    var id = request.params.id;
    var result = await models.todoList.update({
        name: updatedItem
    }, {
            where: {
                id: id
            }
        });
    response.redirect('/todos');
});

module.exports = router;