import express from 'express'

import {toDoItemMiddleware} from '../middelwares';
import {todo} from '../controllers/ToDoRoutController'

export const toDoRouter = express.Router();



toDoRouter.get('/', todo.getAll);

toDoRouter.get('/:id', todo.getById);

toDoRouter.use(toDoItemMiddleware.extendReqItem, toDoItemMiddleware.errorHandler);

toDoRouter.post('/', todo.addNote);

toDoRouter.put('/', todo.editNote);

toDoRouter.options('/:id', todo.editNoteById);

toDoRouter.delete('/:id', todo.deleteNoteById);


