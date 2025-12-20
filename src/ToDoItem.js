import { PRIORITY_LEVELS } from "./constants";

export class ToDoItem {
    constructor(title, description, dueDate, priority, complete = false, id = crypto.randomUUID()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
    }

    static fromJSON(data) {
        const item = new ToDoItem(
            data.title,
            data.description,
            data.dueDate,
            data.priority,
            data.complete,
            data.id
        );

        return item;
    }

    static dummy = new ToDoItem("Test item", "This is a test item.", Date.now(), PRIORITY_LEVELS.MEDIUM, true);
    static dummy2 = new ToDoItem("Test item 2", "This is a test item.", Date.now(), PRIORITY_LEVELS.HIGH, false);

    toggleComplete() {
        this.complete = !this.complete;
    }

    changePriority(newLevel) {
        if (Object.values(PRIORITY_LEVELS).includes(newLevel)) {
            this.priority = newLevel;
        }
    }
}