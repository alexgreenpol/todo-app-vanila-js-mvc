import { EventEmitter } from '../../helpers/event-emmiter';

export class TodoCounterView extends EventEmitter {
	constructor() {
		super();
	}

	getElement(selector) {
    return document.querySelector(selector)
	}

	renderTodoCounter(todos) {

		if(!todos) {
			throw new Error('Error! Todos array is not defined!');
		}

		this.app = this.getElement('.todo-app');

		const todoCounter = this.getElement('.todo-counter');
		
		if(todoCounter) todoCounter.remove();

		this.scopeTodos = todos.length;
		this.activeTodos = todos.filter(item => item.isActive).length;
		this.successfulTodos = this.scopeTodos - this.activeTodos;

		this.app.insertAdjacentHTML('afterbegin', `
			<div class="todo-counter">
    		<h1>To Do list</h1>
    		<div class="counters">
      		<div class="counter">
       			<p class="counter__type">Scope</p>
       			<p class="counter__number">${this.scopeTodos}</p>
      		</div>
      		<div class="counter">
        		<p class="counter__type">Active</p>
        		<p class="counter__number">${this.activeTodos}</p>
      		</div>
      		<div class="counter">
        		<p class="counter__type">Successful</p>
        		<p class="counter__number">${this.successfulTodos}</p>
      		</div>
				</div>
				
				<button class="btn btn--square"><img src="images/plus-icon.svg" alt=""></button>
  		</div>
		`)
		
		this.btnCreator = this.getElement('.btn--square');
		this.btnCreator.addEventListener('click', () => {
			const btn = this.getElement('.btn--creator');
			btn.click();
		})
	}	
}