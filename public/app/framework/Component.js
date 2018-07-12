export default class Component {

	constructor(){
		this.domElement = null;
		this.isRendered = false;
	}
	update() {
		this.renderTo(this.domElement.parentNode);
	}

	renderTo(element) {

		element.innerHTML = this.render();
		this.domElement = element;

		if (!this.isRendered) {
			this.isRendered = true;
			this.onFirstRender();
		}

		this.onRender();
	}



	onFirstRender() {}
	onRender() {
		
	}

	render(){};

	triggerEvent(eventName, detail) {
		this.domElement.dispatchEvent(
			new CustomEvent(eventName, {
				bubbles: true,
				detail,
			}),
		);

		return false;
	}


}