import Component from '../framework/Component.js';
import {ADD_NEW} from '../events.js';

export default class Info extends Component {
    constructor(){
        super();
        this.handleAddNew = () => this.triggerEvent(ADD_NEW)
    }
	render() {
		return `
		<div class="info">
				<h4>Info</h4>
				<p>
					Click on the note in the table on the left to edit.
				</p>
				<p>
					To add a new note, use the button or the link below.
				</p>
				<a href="#" 
					class="card-link" 
					data-name="addNew"
				>Add new</a>
			</div>
		 `;
	}

	onRender() {
		const {domElement} = this;

		domElement.querySelector('[data-name="addNew"]').onclick = this.handleAddNew;
	}
}