const {Router} = require('express');
const Todo = require('../services/todos');
const asyncHandler = require('express-async-handler');

const router = new Router();

router.get('/', asyncHandler(async function(req,res){
const todos = await Todo.findAllNotDone();
res.render('todos', {todos});
}));



// xoa todo
router.get('/:id/done', asyncHandler(async function(req,res){
    const { id } = req.params;
    const todo = await Todo.findById(id);
    
    if (todo) {
        await todo.markAsDone();
    }
    res.redirect('/todos');

}));


// them todo new
router.post('/', asyncHandler (async function postAdd(req,res) {
    const TaoBienAdd = await Todo.add(req.body.cv);
    res.redirect('/todos');
}));






module.exports = router;