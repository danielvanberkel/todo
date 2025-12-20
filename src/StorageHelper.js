import { EventBus } from "./EventBus";
import { ToDoList } from "./ToDoList";

export const StorageHelper = (function() {
    const STORAGE_KEY = "toDoLists";

    const saveLists = function(lists) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    }

    const loadLists = function() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;

        const plainObjects = JSON.parse(data);

        return plainObjects.map(listData => ToDoList.fromJSON(listData));
    }
    
    return { saveLists, loadLists }

})();