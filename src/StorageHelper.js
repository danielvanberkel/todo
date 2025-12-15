export const StorageHelper = (function() {
    const STORAGE_KEY = "toDoLists";

    const saveLists = function(lists) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    }

    const loadLists = function() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    }

    return { saveLists, loadLists }

})();