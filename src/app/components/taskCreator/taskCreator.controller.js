import { TaskCreatorView } from './taskCreator.view';
import { TaskCreatorModel } from './taskCreator.model';

export class TaskCreatorController {
	constructor() {
		this.view = new TaskCreatorView();
		this.model = new TaskCreatorModel();

		this.view.subscribe('Add new task', this.model.addNewTask.bind(this.model));
	}
}