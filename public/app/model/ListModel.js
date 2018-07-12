
import ItemModel from './itemModel.js';
import MainStorage from '../framework/MainStorage.js';

export default class ListModel {
	constructor(){
		this.list = [];
		this.handlers = [];
	}
	

	[Symbol.iterator]() { return this.getNext() }

	*getNext () {
		yield* this.list;
	}

	get length() {
		return this.list.length;
	}

	
	createItem() {
		const {list} = this;
		let id = 0;
		if(list.length > 0) {
			id = list[list.length-1].id+1;
		} 
		const item = new ItemModel(this, id);
		this.list.push(item);
		this.triggerUpdate();
		return item;
	}
	list(){
		return this.list;
	}
	getById(id) {
		return this.list.find(item => item.id === id);
	}

	onUpdate(callback) {
		this.handlers.push(callback);
	}

	addItem(item) {
		this.list.push(item);

		this.save();

		this.triggerUpdate();
	}

	triggerUpdate() {
		const {handlers} = this;

		for (const handler of handlers) {
			handler();
		}
	}

	save() {
		//MainStorage.addNote(this.list);
	}

	static async load() {
		let model;		
		await MainStorage.getAll().then(res => {
			
			model = new ListModel();
			res.forEach(id => {		
				model.addItem(ItemModel.load(model, id));
			});	
			
		}).catch(reason => reason);
		return model;
	}

}