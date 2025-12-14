import { ToDoItem } from "./ToDoItem";

export class ToDoList {
    constructor(name, items = []) {
        this.id = crypto.randomUUID()
        this.name = name;
        this.items = items;
    }

    static defaultList = new ToDoList("My To Do's", [ToDoItem.dummy, ToDoItem.dummy2]);

    addItem(item) {
        this.items.push(item);
    }

    editItem(newItem) {
        const indexOfItemToReplace = this.items.findIndex(i => i.id === newItem.id);
        this.items[indexOfItemToReplace] = newItem;
    }

    deleteItem(item) {
        this.items = this.items.filter(i => i.id !== item.id);
    }
}