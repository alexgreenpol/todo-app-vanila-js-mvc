import { TodoListView } from './todoList.view';
import { TodoListModel } from './todoList.model';
import DataBase from '../../helpers/db';

export class TodoListController {
	constructor() {
		this.view = new TodoListView();
		this.model = new TodoListModel();		

		this.model.subscribe('Props was received', this.view.renderTodoList.bind(this.view));
		this.view.subscribe('Status was changed', this.model.changeStatus.bind(this.model));
		this.view.subscribe('Description was changed', this.model.changeDescription.bind(this.model));
		this.view.subscribe('Task was removed', this.model.removeItem.bind(this.model));
		DataBase.subscribe('New data was added', this.view.createNewItem.bind(this.view));
	}
}