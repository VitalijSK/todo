import Component from '../framework/Component.js';
import ItemModel from '../model/ItemModel.js';
import {CLOSE_FORM} from '../events.js';
import statuses from '../statuses.js';
import {autoBind} from '../framework/autoBind.js';

export default class Edit extends Component {

	constructor(options) {
		super();
		this.options = options;
		this.handleSubmit = () => {
			const {options} = this;
			const {model} = options;
			model.save();
	
			return this.triggerEvent(CLOSE_FORM);
		};
	
		this.handleCancel = () => {
			const {options} = this;
			const {model} = options;
	
			model.reset();
	
			this.triggerEvent(CLOSE_FORM)
		};
	
	}

	render() {
		let caption = 'Your caption';
		let description = 'Description';
		if(this.options.model !== undefined) {
			let { id, caption, description, creationDate, finishDate, status} = this.options.model.values;
		}
		const htmlStatus = statuses.map( status => `<option value="${status}">${status}</option>`);
		return `<h2>Manger</h2>
		<div class="container-manager">
			<form>
				<div class="inp-block-center">
						<label for="caption">Caption</label>
						<input type="text" class="inp" name="caption" 
							data-bind="caption" placeholder="${caption}" required>
						<label for="description">Description</label>
						<textarea class="inp" name="discription" 
							data-bind="description" rows="5" value="${description}">
							</textarea>
						<label for="dataFinished">Date finish</label>
						<input type="date" class="inp" data-bind="finishDate" name="date"  required>
						<label for="status">Status</label>
						<select data-bind="status">${htmlStatus.join('')}</select>
				</div>
				<div class="bnt-block-center">
					<button type="submit" class="btn" >Apply</button>
					<button type="button" data-name="cancel" class="btn cancel" >Cancle</button>
				</div>
			</form>
		</div>`;
	}

	get formElement() {
		return this.domElement.querySelector('form');
	}

	get cancelButtonElement() {
		return this.domElement.querySelector('[data-name="cancel"]');
	}



	onRender() {
		const {deleteButtonElement, cancelButtonElement, formElement, options, domElement} = this;
		
		formElement.onsubmit = this.handleSubmit;
		cancelButtonElement.onclick = this.handleCancel;
		
		autoBind(domElement, options.model);
	}
}