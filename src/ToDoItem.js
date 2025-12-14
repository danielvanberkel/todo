export class ToDoItem {
    constructor(title, description, dueDate, priority, id = crypto.randomUUID()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
    }

    static PriorityLevel = Object.freeze({
        LOW: "LOW",
        MEDIUM: "MEDIUM",
        HIGH: "HIGH"
    })

    static dummy = new ToDoItem("Test item", "This is a test item.", Date.now(), this.PriorityLevel.MEDIUM);
    static dummy2 = new ToDoItem("Test item 2", "This is a test item.", Date.now(), this.PriorityLevel.HIGH);

    toggleComplete() {
        this.complete = !this.complete;
    }

    changePriority(newLevel) {
        if (newLevel in PriorityLevel) {
            this.priority = newLevel;
        }
    }
}