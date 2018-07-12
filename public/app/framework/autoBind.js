import ItemModel from '../model/ItemModel.js';
import statuses from '../statuses.js';

export function autoBind(domElement, model) {
	const elements = {};

	domElement.querySelectorAll('[data-bind]').forEach(element => {
		const key = element.getAttribute('data-bind');

		elements[key] = element;
		reverseBind(element, value => { 
			model[key] = value;
		});
		updateValue(element, model[key]);
	});

	model.onUpdate((key, value) => {	
		if (!elements[key]) {
			return;
		}

		updateValue(elements[key], value);
	});

}

function updateValue(domElement, value) {
	if (domElement instanceof HTMLInputElement) {
		domElement.value = value;
	} else if (domElement instanceof HTMLSelectElement) {
		const htmlStatus = statuses.map( status => {
			if(value === status) {
				return `<option selected value="${status}">${status}</option>`;
			} else {
				return `<option value="${status}">${status}</option>`;
			}
		});
		domElement.innerHTML = htmlStatus.join('');
	} else if (domElement instanceof HTMLTextAreaElement) {
		domElement.value = value;
	} else {
		domElement.innerHTML = value;
	}

}

function reverseBind(domElement, onInput) {
	if (domElement instanceof HTMLInputElement) {
		domElement.oninput = () => onInput(domElement.value);
	} else if (domElement instanceof HTMLSelectElement) {
		domElement.onchange = () => onInput(domElement.options[domElement.options.selectedIndex].value);
	} else if (domElement instanceof HTMLTextAreaElement) {
		domElement.oninput = () => onInput(domElement.value);
	} else {
		domElement.oninput = () => onInput(domElement.innerHTML);
	}
}