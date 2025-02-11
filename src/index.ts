'use strict';

import { v4 as uuidv4 } from 'uuid';
import {TodoItem} from './TodoItem';

const form = document.querySelector<HTMLFormElement>('#new-task-form');
const taskList = document.querySelector<HTMLUListElement>('#list');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: TodoItem<string>[] = [];


form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!input?.value || input?.value === null) return;
  
  const id = uuidv4();
  const task = new TodoItem(id, input?.value);

  taskList?.insertAdjacentHTML('beforeend', task.addTask());
  tasks.push(task);
  saveTasks();
  form.reset();
});

taskList?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  const parent = target.parentElement as HTMLLabelElement;
  const listItem = parent.parentElement as HTMLLIElement;
  const id = parent.parentElement?.id;

  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.complete = !task.complete;
    if (task.complete) {
      tasks.splice(tasks.indexOf(task), 1);
      setTimeout(() => taskList?.removeChild(listItem), 200);
    }
    saveTasks();
  }
});

const saveTasks = (): void => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

const loadTasks = (): TodoItem<string>[] => {
  const tasks = localStorage.getItem("TASKS");
  if (tasks === null) return [] as TodoItem<string>[];
  const tasksArray = JSON.parse(tasks)
  return tasksArray.map((task: TodoItem<string>) => new TodoItem(task.id, task.task, task.complete));
}

const loadedTasks = loadTasks();
loadedTasks.forEach(task => {
  taskList?.insertAdjacentHTML('beforeend', task.addTask());
  tasks.push(task);
});