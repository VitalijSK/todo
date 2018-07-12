

export default class ApiStorage {

    static async getAll(){		
        return await fetch('/api/todo', {
			method: 'GET',
			cache: 'default'
			}).then(res=>{
                return res.json();
            });
    };
      
    static async getById(id) {
        return await fetch('/api/todo/'+id, {
			method: 'GET',
			cache: 'default'
			}).then(res=>{
                return res.json();
            });
    };
      
      static async addNote(item){
        return await fetch('/api/todo', {
			method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
			cache: 'default'
            });
      };
      
      static async editNote(list) {
        return await fetch('/api/todo', {
			method: 'PUT',
            body: JSON.stringify(list),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
			cache: 'default'
            });
      };
      static  async editNoteById(id, values) {
        return await fetch('/api/todo/'+id, {
            method: 'OPTIONS',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
			});
      };
      static  async deleteNote(id)  {
        return await fetch('/api/todo/'+id, {
			method: 'DELETE',
			cache: 'default'
			});
      };

}