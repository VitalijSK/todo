import {ToDo} from '../models';

export const toDoItemMiddleware = {
  extendReqItem: (req, res, next) => {
    let item;
    for(let key in req.body){
      item = JSON.parse(key); 
    };
    if(item !== undefined) {
      const newToDo = new ToDo({
        id: item.id,
        creationDate: item.creationDate,
        finishDate: item.finishDate,
        status: item.status,
        caption: item.caption,
        description: item.description}
      );
      if(!newToDo) {
        next('Wrong data for model');
      } else {
        req.item = newToDo;
        res.status(204);
        next();
      }
    } else {
      next()
    }
  },
  isExistId: (req, res, next) => {
    const id = req.url.split('/')[1];
    if( id ) {
      if( !parseInt(id)) {
        console.log(req.url.split('/')[1]);
        next('Wrong Id');
      }
      Dao.isExistId(id).then(() => next()).catch(() => {
        res.status(404);
        next('Wrong Id')
      });
    } else {
      next();
    }
  },
  errorHandler: (err, req, res, next ) => {
    next(err);
  }
};