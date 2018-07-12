import ListModel from '/model/ListModel.js';
import MainStorage from '/framework/MainStorage.js';

export default class ItemModel {

	constructor(list, id){
		this.list = list;
		this.values = {};
		this.isNew = true;
		this.values.id = id;
		this.values.creationDate = this.getDate(new Date());
		this.handlers = [];
	}

	get id() {
		return this.values.id;
	}

	set id(value) {
		this.setValue('id', value);
	}

	get caption(){
		return this.values.caption || '';
	}

	set caption(value) {
		this.setValue('caption', value);
	}

	get creationDate() {
		return this.values.creationDate || this.getDate(new Date());
	}
	get finishDate() {
		return this.values.finishDate || '';
	}
	getDate(date){
		return `${date.getUTCFullYear()}-${this.pad(date.getUTCMonth() + 1)}-${this.pad(date.getUTCDate())}`;
	}
	pad(number) {
		if (number < 10) {
		  return `0${number}`;
		}
		return number;
	  }
	set finishDate(value) {
		this.setValue('finishDate', value);
	}
	get status() {
		return this.values.status || 'NEW';
	}

	set status(value) {
		this.setValue('status', value);
	}
	get description() {
		return this.values.description || 'none';
	}

	set description(value) {
		this.setValue('description', value);
	}

	save() {
		const {isNew, list} = this;

		if (isNew) {
			this.isNew = false;
			
			MainStorage.addNote({id : this.id, caption: this.caption,
				description: this.description, status : this.status,
				creationDate: this.creationDate,finishDate: this.finishDate});
		} else {
			MainStorage.editNoteById(this.values.id, this.values);
		}
		
	}

	reset() {
		if (this.isNew) {
			return;
		}

		this.load();
	}
	delete() {
		if (this.isNew) {
			return;
		}
		MainStorage.deleteNote(this.values.id);
		this.list.list = this.list.list.filter(elem=>elem.values.id !== this.values.id);
		this.onUpdate();		
	}

	load() {
		const self = this;
		MainStorage.getById(this.values.id)
			.then(values=>{
				self.isNew = false;	
				Object.keys(values).forEach(key => this.setValue(key, values[key])); 
				
			});		
	}

	onUpdate(callback) {
		this.handlers.push(callback);
	}

	

	setValue(key,value) {
		const {values, handlers, isNew, list} = this;

		if (values[key] === value) {
			return;
		}

		values[key] = value;

		for (const handler of handlers) {
			handler(key, value);
		}

		if (!isNew) {
			 list.triggerUpdate();
		}
	}

	static load(list, id) {
		const model = new ItemModel( list, id);
		model.load();
		return model;
	}
}