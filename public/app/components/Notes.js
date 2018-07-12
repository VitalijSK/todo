import Component from '../framework/Component.js';
import {ADD_NEW, EDIT} from '../events.js';
import ListModel from '../model/ListModel.js';
import ItemModel from '../model/ItemModel.js';
import {autoBind} from '../framework/autoBind.js';
import MainStorage from '../framework/MainStorage.js';


export default class Notes extends Component {

	constructor(options) {
		super();
		this.options = options;

		this.handleTrClick = (model) => () => this.triggerEvent(EDIT, model);
		this.handleAddNew = () => this.triggerEvent(ADD_NEW);;
		this.handleDelete = (model, trElement, itemId) => (e) => {
			e.stopImmediatePropagation();
			trElement.outerHTML = '';
			MainStorage.deleteNote(itemId);
			model.delete();
		};
	}

	render(){
		const {model} = this.options
		const items = model.list;
		const rows = [...items].map(({ id, caption, description, creationDate, finishDate, status}, index) => `
			
		<article class="note ${status}"  data-item-id="${id}">
					<div>
							<p data-bind="caption">${caption}</p>
							<p data-bind="description">
								${description}
							</p>
					</div>
					<div>
							<p class="status" data-bind="status">${status}</p>
							<p>Created : <span class="date" data-bind="creationDate">${creationDate}</span></p>
							<p>Finish : <span class="date" data-bind="finishDate">${finishDate}</span></p>
					</div>
					<div>
						<span data-name="delete">X</span>
					</div>
			</article>
		`);
		return ` <button data-name="addNew"	type="button" 
					class="btn" >Add new</button>
					${rows.length ? rows.join('') : `
							<p>Notes is empty</p>
					`}`;
	}
	get addNewElement() {
		return this.domElement.querySelector('[data-name="addNew"]');
	}

	onRender() {
		const {addNewElement, domElement, options} = this;
		const {model} = options;

		addNewElement.onclick = this.handleAddNew;

		domElement.querySelectorAll('[data-item-id]').forEach((trElement) => {
			const itemId = trElement.getAttribute('data-item-id');
			const itemModel = model.getById(parseInt(itemId));
			const deleteButton = trElement.querySelector('[data-name="delete"]');

			deleteButton.onclick = this.handleDelete(itemModel, trElement, itemId);
			trElement.onclick = this.handleTrClick(itemModel);

			autoBind(trElement, itemModel);
		})
	}

	onFirstRender() {
		const {model} = this.options;
		//model.onUpdate(() => this.update());
	}
}