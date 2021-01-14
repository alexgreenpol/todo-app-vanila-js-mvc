import { TodoCounterView } from './todoCounter.view';
import { TodoCounterModel } from './todoCounter.model';
import DataBase from '../../helpers/db';

export class TodoCounterController {
	constructor() {
		this.view = new TodoCounterView();
		this.model = new TodoCounterModel();		

		this.model.subscribe('Props was received', this.view.renderTodoCounter.bind(this.view));
		DataBase.subscribe('Data was changed', this.model.getTodos.bind(this.model));
	}
}