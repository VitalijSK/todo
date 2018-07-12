import {dao} from '../dao';

class ToDo {
    getAll(req, res){
        dao.getToDoList()
          .then((data) => {res.status(200).end(JSON.stringify(data.map(elem => elem.id)))})
          .catch((err) => {res.status(404).end('Something gone wrong')});
      };
      
    getById(req, res) {
        dao.getToDoItem(+req.params.id)
          .then((data) => { res.status(200).json(data)})
          .catch(() => {res.status(404).end('Something gone wrong')});
      };
      
      addNote(req, res){
        dao.addToDoItem(req.item)
          .then((data) => {res.status(201).json(data) })
          .catch(() => {res.status(404).end('Something gone wrong')});
      };
      
      editNote(req, res) {
        dao.updateToDo(req.item)
          .then((data) => {res.status(201).json(data) })
          .catch(() => {res.status(404).end('Something gone wrong')});
      };
      editNoteById(req, res) {
        dao.updateToDoById(req.params.id, req.item)
          .then((data) => {res.status(201).json(data) })
          .catch(() => {res.status(404).end('Something gone wrong')});
      };
      deleteNoteById(req, res)  {
        dao.deleteToDoItem(+req.params.id)
          .then((data) => {res.status(201).json(data) })
          .catch(() => {res.status(404).end('Something gone wrong')});
      };
};
export const todo = new ToDo();