interface ITodoItem<T> {
    id: T;
    task: string;
    complete: boolean;
    addTask(): string;
  }

export class TodoItem<T> implements ITodoItem<T> {
    
    public todayDate: Date;

    constructor(public id: T, public task: string, public complete: boolean = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        this.todayDate = new Date();
    }

    addTask(): string {
        return `<li id="${this.id}">
                    <label for="task-${this.id}">
                        <input type="checkbox" 
                            id="task-${this.id}" 
                            ${this.complete ? "checked" : ""}>
                        ${this.task}
                    </label>
                </li>`;
    }
}