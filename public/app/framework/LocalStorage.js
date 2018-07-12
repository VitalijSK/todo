export default  class LocalStorage {

    static getAll(){
        return Promise.resolve(JSON.parse(localStorage.getItem('model_list')));
    };
      
    static getById(id) {
        return Promise.resolve(JSON.parse(localStorage.getItem(`model_${id}`)));
    };
        
    static addNote(note){
        let list = JSON.parse(localStorage.getItem('model_list'));
        if(list === null) {
            list = [];
        }
        list[list.length] = note.id;
        localStorage.setItem('model_list', JSON.stringify(list));
        localStorage.setItem(`model_${note.id}`, JSON.stringify(note));
    };
    static editNoteById(id, values){
		localStorage.setItem(
			`model_${id}`,
			JSON.stringify(values)
		);
    };

      static deleteNote(id)  {
        localStorage.removeItem(`model_${id}`);
        const list = JSON.parse(localStorage.getItem('model_list'));
        localStorage.setItem('model_list', JSON.stringify(list.filter(elem => id != elem)));
      };

}