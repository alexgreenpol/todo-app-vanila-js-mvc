import DataBase from '../../helpers/db';
import { EventEmitter } from '../../helpers/event-emmiter';

export class TodoCounterModel extends EventEmitter {
	constructor() {
		super();
		this.getTodos();
	}

	async getTodos() {
		this.todos = await DataBase.getData('todos');
		this.emit('Props was received', this.todos);
	}
}