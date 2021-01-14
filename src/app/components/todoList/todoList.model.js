import DataBase from '../../helpers/db';
import { EventEmitter } from '../../helpers/event-emmiter';

export class TodoListModel extends EventEmitter {
	constructor() {
		super();
		this.getTodos();
	}

	async getTodos() {
		this.todos = await DataBase.getData('todos');
		this.emit('Props was received', this.todos);
	}

	changeStatus(data) {
		DataBase.updateData('todos', data.id, {isActive: data.status});
	}
	changeDescription(data) {
		DataBase.updateData('todos', data.id, {description: data.description});
	}
	removeItem(id) {
		DataBase.deleteData('todos', id);
	}
}