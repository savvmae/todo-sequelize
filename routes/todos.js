const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/todos', async (request, response) => {
    var isNotCompleted = await models.todoList.findAll({
        order: [['created_at', 'DESC']],
        where: {
            is_completed: false
        }
    })
    var isCompleted = await models.todoList.findAll({
        order: [['created_at', 'DESC']],
        where: {
            is_completed: true
        }
    })
    response.render('todos', { notCompleted: isNotCompleted, isCompleted: isCompleted });
});

router.post('/todos', async (request, response) => {

    request.checkBody('newItem', 'Item must be at least 1 character').len(1);
    var errors = request.validationErrors();
    var newtodo = request.body.newItem;
    var isNotCompleted = await models.todoList.findAll({
        order: [['created_at', 'DESC']],
        where: {
            is_completed: false
        }
    })
    var isCompleted = await models.todoList.findAll({
        order: [['created_at', 'DESC']],
        where: {
            is_completed: true
        }
    })
    
    if (errors){
        response.render('todos', {errors: errors, notCompleted: isNotCompleted, isCompleted: isCompleted } );
    } else {
    var result = await models.todoList.create({ name: newtodo });
    response.redirect('/todos');
}});

router.post('/todos/deleteall', async (request, response) => {
    var deleted = await models.todoList.destroy({
        where: {
            is_completed: true
        }
    })

    response.redirect('/todos');
});

router.post('/delete/:id', async (request, response) => {
    var id = request.params.id;
    var result = await models.todoList.destroy({
        where: {
            id: id
        }
    });
    response.redirect('/todos');
});

router.post('/todos/:id', async (request, response) => {
    var id = request.params.id;
    var result = await models.todoList.update({
        is_completed: true
    }, {
            where: {
                id: id
            }
        });
    var isCompleted = await models.todoList.findAll({
        order: [['created_at', 'DESC']],
        where: {
            is_completed: true
        }
    })
    var isNotCompleted = await models.todoList.findAll({
        order: [['created_at', 'DESC']],
        where: {
            is_completed: false
        }
    })
    response.render('todos', { isCompleted: isCompleted, notCompleted: isNotCompleted });
});

module.exports = router;
