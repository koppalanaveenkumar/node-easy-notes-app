const express = require('express');
const userRouter = express.Router();
const notes = require('../controllers/note.controllers');

userRouter.post('/notes', notes.createNote);
userRouter.get('/allNotes', notes.findAll);
userRouter.get('/getById/:id', notes.findOne);
userRouter.put('/updateById/:id', notes.updateById);
userRouter.delete('/deleteById/:id', notes.deleteById)

module.exports = userRouter;