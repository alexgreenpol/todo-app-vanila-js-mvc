import { EventEmitter } from '../../helpers/event-emmiter';

export class TodoListView extends EventEmitter {
	constructor() {
		super();

		this.isEdit = false;
		window.addEventListener("resize", () => {
			this.resizeTextarea();
		}, true);
	}

	getElement(selector) {
    return document.querySelector(selector)
	}

	createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element
	}

	createNewItem(todo) {

		if(!todo) {
			throw new Error('Error! Todo data is not defined!');
		}

		this.app = this.getElement('.todo-app');
		const todoList = this.getElement('.todo-list');
		const welcomeMessage = this.getElement('.todo-list__welcome');

		if(welcomeMessage) {
			welcomeMessage.remove();
		}

		// create nodes

		this.todoListItem = this.createElement('li', 'todo-list__item');
		this.todoListCheckbox = this.createElement('label', 'todo-list__checkbox');
		this.checkbox = this.createElement('input', 'checkbox');
		this.checkmark = this.createElement('span', 'checkmark');
		this.todoListDate = this.createElement('p', 'todo-list__date');
		this.todoListDescription = this.createElement('textarea', 'todo-list__description');
		this.todoListButtons = this.createElement('div', 'todo-list__buttons');
		this.editBtn = this.createElement('button', 'edit-btn');
		this.removeBtn = this.createElement('button', 'remove-btn');

		// create structure

		this.todoListItem.id = todo.id;
		this.checkbox.type = 'checkbox';
		this.todoListDate.textContent = todo.date;
		this.todoListDescription.value = todo.description;
		this.todoListDescription.rows = '1';
		this.todoListDescription.disabled = 'disabled';

		if(!todo.isActive) {
			this.todoListItem.classList.add(`todo-list__item--done`);
			this.checkbox.checked = 'checked';
			this.editBtn.disabled = 'disabled';
		}
		
		// add listeners

		this.todoListDescription.addEventListener('input', this.textareaHandler);
		this.checkbox.addEventListener('click', (e) => {this.checkboxHandler(e, todo)});
		this.editBtn.addEventListener('click', (e) => {this.editBtnHandler(e, todo)});
		this.removeBtn.addEventListener('click', (e) => {this.removeBtnHandler(e, todo)});
		
		// append structure

		this.todoListButtons.append(this.editBtn, this.removeBtn);
		this.todoListCheckbox.append(this.checkbox, this.checkmark);
		this.todoListItem.append(this.todoListCheckbox, this.todoListDate, this.todoListDescription, this.todoListButtons);

		if(todoList) {
			todoList.insertAdjacentElement('afterbegin', this.todoListItem);
			this.editBtn.click();
		} else {
			this.todoList.append(this.todoListItem);
		}

	}

	renderTodoList(todos) {

		if(!todos) {
			throw new Error('Error! Todos array is not defined!');
		}

		this.app = this.getElement('.todo-app');
		this.todoCounter = this.getElement('.todo-counter');
		this.todoList = this.createElement('ul', 'todo-list');	

		if(!todos.length) {
			this.todoList.innerHTML = "<h3 class='todo-list__welcome'>Welcom! You need to create your first task.</h3>"
			this.todoCounter.insertAdjacentElement('afterend',this.todoList);
		}

		todos.reverse().forEach(todo => {
			this.createNewItem(todo);	
		});

		this.todoCounter.insertAdjacentElement('afterend',this.todoList);
		this.resizeTextarea();
	}	

	editBtnHandler(e, todo) {
		const currentListItem = e.target.closest('.todo-list__item');
		const currentTextArea = currentListItem.querySelector('.todo-list__description');
		const currentCheckbox = currentListItem.querySelector('.checkbox');
		const currentEditBtn = e.target;

		this.isEdit = !this.isEdit;	
		
		if(!this.Edit) {

			const currentValue = currentTextArea.value;
			if(!currentValue) {
				alert('Description field is required!');
				return
			}
			
			this.emit('Description was changed', {id: todo.id, description: currentTextArea.value});
		}

		currentEditBtn.classList.toggle('edit-btn--active');
		currentTextArea.toggleAttribute('disabled');
		currentCheckbox.toggleAttribute('disabled');

		currentListItem.classList.toggle('todo-list__item--active');
		currentTextArea.focus();
	}

	removeBtnHandler(e, todo) {
		
		if(!todo) {
			throw new Error('Error! Todo data is not defined!');
		}

		const currentListItem = e.target.closest('.todo-list__item');
		currentListItem.remove();

		const todoList = this.getElement('.todo-list');
		
		if(!todoList.children.length) {
			this.todoList.innerHTML = "<h3 class='todo-list__welcome'>Welcom! You need to create your first task.</h3>";
		}

		this.emit('Task was removed', todo.id);
	}

	textareaHandler(e) {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	}

	resizeTextarea() {
		const textareas = document.querySelectorAll('.todo-list__description');
		this.resizeCycle(textareas);

		window.addEventListener("resize", () => {
			this.resizeCycle(textareas);
		}, true);
	}

	resizeCycle(textareas) {
		textareas.forEach((item) => {
			item.style.height = 'auto';
			item.style.height = `${item.scrollHeight}px`;
		})
	}

	checkboxHandler(e, todo) {
		const currentListItem = e.target.closest('.todo-list__item');

		todo.isActive = !todo.isActive;		

		currentListItem.classList.toggle('todo-list__item--done');
		currentListItem.querySelector('.edit-btn').toggleAttribute('disabled');

		this.emit('Status was changed', {id: todo.id, status: todo.isActive});
	}
}