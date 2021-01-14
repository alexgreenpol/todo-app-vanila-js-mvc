require('assets/less/main.less');
import { initTodoCounterController } from './components/todoCounter/index';
import { initTodoListController } from './components/todoList/index';
import { initTaskCreatorController } from './components/taskCreator/index';

(async ()=>{ 
  initTodoCounterController();
  initTodoListController();
  initTaskCreatorController();
})()

