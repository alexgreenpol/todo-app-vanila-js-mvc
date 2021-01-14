import { EventEmitter } from '../../helpers/event-emmiter';

export class TaskCreatorView extends EventEmitter {
	constructor() {
		super();

		this.btnCreatorHandlerVar = this.btnCreatorHandler.bind(this);
		this.renderTodoCreationBlock();
	}

	getElement(selector) {
    return document.querySelector(selector)
	}

	createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element
	}

	renderTodoCreationBlock() {
		
		this.app = this.getElement('.todo-app');

		// create nodes
		
		this.todoCreationBlock = this.createElement('div', 'todo-creation-block');
		this.btnCreator = this.createElement('button', 'btn');
		this.btnCreator.className += ` btn--green btn--creator`;

		this.btnCreator.innerHTML =`<img src="images/plus-icon.svg" alt="">Create new task`;

		// add listeners

		this.btnCreator.addEventListener('click', this.btnCreatorHandlerVar);

		// append structure

		this.todoCreationBlock.append(this.btnCreator);
		this.app.insertAdjacentElement('beforeend',this.todoCreationBlock);

	}

	btnCreatorHandler() {
		this.emit('Add new task');
	}
}