import DataBase from '../../helpers/db';
import date from 'date-and-time';
import { EventEmitter } from '../../helpers/event-emmiter';

export class TaskCreatorModel extends EventEmitter {
	constructor() {
		super();
	}

	addNewTask() {
		const now = new Date();
		const newId = `${now.valueOf()}`;
		const dateInCurrentFormat = date.format(now, 'DD MMM YYYY');

		const newTask = {
			id: newId,
			date: dateInCurrentFormat, 
			description: 'Please enter task description', 
			isActive: true
		}

		DataBase.setData('todos', newId, newTask);
	}
}