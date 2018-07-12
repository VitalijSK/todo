import Component from '/public/app/framework/Component.js';
import Notes from '/public/app/components/Notes.js';
import Manager from '/public/app/components/Manager.js';
import Info from '/public/app/components/Info.js';
import ItemModel from '/public/app/ItemModel.js';
import {ADD_NEW, CLOSE_FORM, EDIT} from '/public/app/events.js';
import ListModel from '/public/app/model/ListModel.js';

export default class App extends Component {

	constructor(){
		super();
		this.model = ListModel.load();
		
		this.handleAddNew = () => {
			this.model.then(model => {
				this.showManager(model.createItem());
				this.showNotes();
			});
		};
	
		this.handleEdit = ({detail}) => {
			this.showManager(detail)
		};

		this.handleCloseForm = () => {
			this.showInfo()
		};

	
	
	}
	

	render(){
		return `   <header>
        	<h1>Notebook</h1>
		</header>
		<main class="grid">
			<section data-child="notes">
			
			</section>
			<aside data-child="manager">
				
			</aside>
    	</main>`;
	}

	get notesElement() {
		return this.domElement.querySelector(
			'[data-child="notes"]'
		);
	}

	get editElement() {
		return this.domElement.querySelector(
			'[data-child="manager"]'
		);
	}

	onRender() {
		const {domElement} = this;

		domElement.addEventListener(ADD_NEW, this.handleAddNew);
		domElement.addEventListener(EDIT, this.handleEdit);
		domElement.addEventListener(CLOSE_FORM, this.handleCloseForm);

		this.showNotes();
		this.showInfo();
	}

	showNotes() {
		this.model.then(model => {
			const notes = new Notes({
				model
			});
	
			notes.renderTo(this.notesElement);
		});
	}

	showInfo() {
		const info = new Info();
		info.renderTo(this.editElement);
	}
	showManager(model) {
		const manager = new Manager({ model });
		manager.renderTo(this.editElement);
	}
}
