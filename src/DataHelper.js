import { ToDoItem } from "./ToDoItem.js";
import { ToDoList } from "./ToDoList.js";
import { DateTime } from "luxon";

export const DataHelper = (function() {
    let lists = [ToDoList.defaultList];

    const FILTERS = {
        TODAY: "TODAY",
        UPCOMING: "UPCOMING",
        LIST_ID: "LIST_ID"
    }

    const getListNameByID = (listId) => lists.find(l => l.id === listId).name;

    const formatDate = function(date) {
        return DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_FULL);
    }

    const formatDateForInput = (timestamp) => {
        const d = new Date(Number(timestamp));
        return d.toISOString().split("T")[0];
    };

    const getListsMetadata = () => ({
        names: lists.map(list => list.name), 
        ids: lists.map(list => list.id) 
    });

    const createList = function(name) {
        const list = new ToDoList(name);
        lists.push(list);
    }

    const deleteList = function(list) {
        lists = lists.filter(l => l.id !== list.id);
    }

    const addItemToList = function(item) {
        const list = lists.find(l => l.id === item.listId);
        const itemObj = new ToDoItem(item.title, item.description, item.dueDate, item.priority);
        list.addItem(itemObj);
    }

    const editItemInList = function (item) {
        const list = lists.find(l => l.id === item.listId);
        const itemObj = new ToDoItem(item.title, item.description, item.dueDate, item.priority);
        list.editItem(itemObj);
    }

    const deleteItemFromList = function(item, listId) {
        const list = lists.find(l => l.id === listId);
        list.deleteItem(item);
    }

    const isToday = function(date) {
        const today = new Date();
        const d = new Date(date);

        return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
        );
    }

    const isFuture = function(date) {
        return new Date(date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0);
    }

    const getLists = function(itemFilter, listId) {
        if (itemFilter === FILTERS.TODAY) {
            return lists.map(list => ({ 
                ...list,
                items: list.items.filter(item => isToday(item.dueDate))
            }))
        } else if (itemFilter === FILTERS.UPCOMING) {
            return lists.map(list => ({ 
                ...list,
                items: list.items.filter(item => isFuture(item.dueDate))
            }))
        } else if (itemFilter === FILTERS.LIST_ID && arguments.length === 2) {
            return lists.filter(list => list.id === listId)
        } else {
            return lists
        }
    }

    return { 
        FILTERS, 
        getLists, 
        getListsMetadata, 
        getListNameByID, 
        createList, 
        deleteList, 
        addItemToList, 
        editItemInList, 
        deleteItemFromList, 
        formatDate, 
        formatDateForInput 
    }
})();