import { STORAGE_KEYS } from "./constants";
import { ToDoList } from "./ToDoList";

export const StorageHelper = (function() {
    const saveLists = function(lists) {
        localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
    }

    const loadLists = function() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;

        const plainObjects = JSON.parse(data);

        return plainObjects.map(listData => ToDoList.fromJSON(listData));
    }
    
    return { saveLists, loadLists }

})();