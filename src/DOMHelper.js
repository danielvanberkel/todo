import { DataHelper } from "./DataHelper";
import { NavigationHelper } from "./NavigationHelper.js";

export const DOMHelper = (function() {
    // Constants
    const ELEMS = Object.freeze({
        PAGE_LINKS: {
            inbox: document.querySelector("#inbox"),
            today: document.querySelector("#today"),
            upcoming: document.querySelector("#upcoming")
        },
        TASK_FIELDS: {
            TITLE: document.querySelector("input#title"),
            DESCRIPTION: document.querySelector("textarea#description"),
            DUE_DATE: document.querySelector("input#due-date"),
            PRIORITY: document.querySelector("select#priority"),
            LIST_ID: document.querySelector("select#list"),
            TASK_ID: document.querySelector("input#task-id")
        },
        LIST_NAME: document.querySelector("input#name"),
        BUTTONS: {
            ADD_TASK: document.querySelector("#add-new-task"),
            ADD_LIST: document.querySelector("#add-new-list"),
            MODAL_CONFIRM_ADD_LIST: document.querySelector(".add-edit-list-modal button.confirm-action"),
            MODAL_CONFIRM_ADD_TASK: document.querySelector(".add-edit-task-modal button.confirm-action")
        },
        MENU: {
            LIST_LINKS: document.querySelector("ul#lists"),
            PAGE_LINKS: document.querySelectorAll(".page-link")
        },
        PAGE: {
            TITLE: document.querySelector("main h1")
        },
        LISTS_CONTAINER: document.querySelector("main .list")
    })

    // Element Creation
    const createElem = function(tagName, options = { class: null, text: null, attributes: null }) {
        const element = document.createElement(tagName);
        if (options.class) element.classList.add(...[].concat(options.class));
        if (options.text) element.textContent = options.text;
        if (options.attributes) {
            for (const [key, value] of Object.entries(options.attributes)) {
                element.setAttribute(key, value);
            }
        }
        
        return element
    }

    const makeToDoItemDiv = function(item, listId) {
        // Create containers
        const taskDiv = createElem("div", { class: "task" });

        const taskContentDiv = createElem("div", { class: "task-content"});
        const accessoriesDiv = createElem("div", { class: "accessories"});
        
        // Task Content Div
        const completeButton = createElem("input", { attributes: { 
            type: "checkbox", 
            name: "complete",
        } 
        });
        completeButton.checked = item.complete;
        completeButton.addEventListener("change", () => {
            DataHelper.toggleItemComplete(item);
        })
        
        const toDoTitle = createElem("p", { text: item.title});
        
        if (item.complete) toDoTitle.classList.add("complete")
        
        const priorityLabel = createElem("span", { 
            class: ["priority", `${item.priority.toLowerCase()}`], 
            text: `${item.priority}`
        });
        
        // Accessories Div
        const dueDate = createElem("p", {
            class: 'due-date',
            text: `due ${DataHelper.formatDate(item.dueDate)}`
        });
        
        const editButton = createElem("button");
        const editIcon = createElem("span", {
            class: "material-symbols-rounded",
            text: "edit"
        });
        editButton.appendChild(editIcon);
        editButton.addEventListener("click", () => {
            openModal(".add-edit-task-modal", "Edit To Do", "Confirm Changes");
            populateTaskDetailFields(item, listId);
            console.log(item.dueDate);
        });
        
        const deleteButton = createElem("button");
        const deleteIcon = createElem("span", {
            class: "material-symbols-rounded",
            text: "delete"
        });
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", () => {
            DataHelper.deleteItemFromList(item, listId);
            displayCurrentPage();
        });

        // Append to containers
        taskDiv.append(taskContentDiv, accessoriesDiv);
        taskContentDiv.append(completeButton, toDoTitle, priorityLabel);
        accessoriesDiv.append(dueDate, editButton, deleteButton);
        
        return taskDiv;
    }

    const makeListElem = function(list) {
        const listItem = createElem("li");
        listItem.dataset.listId = list.id;

        const span = createElem("span", { class: "material-symbols-rounded", text: "tag" } );
        const name = createElem("p", { text: list.name });

        listItem.addEventListener("click", () => {
            NavigationHelper.setList(list.id, list.name);
            displayCurrentPage();
        });

        listItem.append(span, name);
        return listItem;
    }

    // Event Handlers
    const initializeListeners = function() {
        const addTaskButton = ELEMS.BUTTONS.ADD_TASK;
        addTaskButton.addEventListener("click", newTaskClickHandler);

        const addListButton = ELEMS.BUTTONS.ADD_LIST;
        addListButton.addEventListener("click", newListClickHandler);

        const addListConfirmButton = ELEMS.BUTTONS.MODAL_CONFIRM_ADD_LIST;
        addListConfirmButton.addEventListener("click", newListConfirmClickHandler);

        const addTaskConfirmButton = ELEMS.BUTTONS.MODAL_CONFIRM_ADD_TASK;
        addTaskConfirmButton.addEventListener("click", newTaskConfirmClickHandler)

        const taskModal = document.querySelector(".add-edit-task-modal");
        taskModal.querySelector(".close").addEventListener("click", () => taskModal.close());
        taskModal.querySelector(".cancel").addEventListener("click", () => taskModal.close());

        const listModal = document.querySelector(".add-edit-list-modal");
        listModal.querySelector(".close").addEventListener("click", () => listModal.close());
        listModal.querySelector(".cancel").addEventListener("click", () => listModal.close());
    }

    const newTaskClickHandler = function() {
        populateListsSelector();
        openModal(".add-edit-task-modal", "New To Do", "Add");
    }

    const newTaskConfirmClickHandler = function() {
        const itemObj = readTaskDetailFields();
        
        if (itemObj.taskId) { // if task_id is filled, we're editing
            DataHelper.editItemInList(itemObj);
        } else { // we're adding a new task
            DataHelper.addItemToList(itemObj);
        }

        displayCurrentPage();
        emptyTaskDetailFields();
    }   

    const newListClickHandler = function(event) {
        event.preventDefault();
        openModal(".add-edit-list-modal", "New List", "Create");
    }

    const newListConfirmClickHandler = function() {
        const name = ELEMS.LIST_NAME.value;
        DataHelper.createList(name);
        displayLists();
    }

    // Modals
    const openModal = function(modalClassName, modalTitle, confirmButtonText) {
        const dialog = document.querySelector(modalClassName);

        dialog.querySelector(".modal-header p").textContent = modalTitle;
        dialog.querySelector(".confirm-action").textContent = confirmButtonText;
            
        dialog.showModal();
    }

    const populateListsSelector = function() {
        const listField = ELEMS.TASK_FIELDS.LIST_ID;
        listField.textContent = '';
        const lists = DataHelper.getLists();

        for (const list of lists) {
            const opt = createElem("option", {
                text: list.name,
                attributes: {
                    value: list.id
                }
            });

            listField.appendChild(opt);
        }
    }

    const emptyTaskDetailFields = function() {
        ELEMS.TASK_FIELDS.TITLE.value = "";
        ELEMS.TASK_FIELDS.DESCRIPTION.value = "";
        ELEMS.TASK_FIELDS.DUE_DATE.value = "";
        ELEMS.TASK_FIELDS.PRIORITY.value = "LOW";
        ELEMS.TASK_FIELDS.TASK_ID.value = "";
    }

    const populateTaskDetailFields = function(item, listId) {
        populateListsSelector();
        ELEMS.TASK_FIELDS.TITLE.value = item.title;
        ELEMS.TASK_FIELDS.DESCRIPTION.value = item.description;
        ELEMS.TASK_FIELDS.DUE_DATE.value = DataHelper.formatDateForInput(item.dueDate);
        ELEMS.TASK_FIELDS.PRIORITY.value = item.priority;
        ELEMS.TASK_FIELDS.TASK_ID.value = item.id;
        ELEMS.TASK_FIELDS.LIST_ID.value = listId;
    }

    const readTaskDetailFields = function() {
        const title = ELEMS.TASK_FIELDS.TITLE.value;
        const description = ELEMS.TASK_FIELDS.DESCRIPTION.value;
        const dateStr = ELEMS.TASK_FIELDS.DUE_DATE.value;
        const dueDate = dateStr ? new Date(dateStr).getTime() : null;
        const priority = ELEMS.TASK_FIELDS.PRIORITY.value;
        const taskId = ELEMS.TASK_FIELDS.TASK_ID.value;
        const listId = ELEMS.TASK_FIELDS.LIST_ID.value;

        const item = { title: title, description: description, dueDate: dueDate, priority: priority, taskId: taskId, listId: listId };
        return item;
    }
    
    // Display
    const displayLists = function() {
        const listsUl = ELEMS.MENU.LIST_LINKS;
        listsUl.textContent = '';
        
        for (const list of DataHelper.getLists()) {
            const li = makeListElem(list);
            listsUl.prepend(li);
        }
    }
    
    const displayItemsOfList = function(list) {
        const listContainer = ELEMS.LISTS_CONTAINER;
        const taskContainer = createElem("div", { class: "tasks" });
        const titleElem = createElem("h2", { text: list.name });
        listContainer.appendChild(taskContainer);
        taskContainer.appendChild(titleElem);

        for (const item of list.items) {
            taskContainer.appendChild(makeToDoItemDiv(item, list.id));
        }
    }

    const displayItemsOfAllLists = function(lists) {
        const listContainer = ELEMS.LISTS_CONTAINER;
        listContainer.textContent = '';

        for (const list of lists) {
            if (list.items.length > 0) {
                displayItemsOfList(list);
            }
        }
    }

    const displayCurrentPage = function() {
        const currentPage = NavigationHelper.getCurrentPage();
        const listContainer = ELEMS.LISTS_CONTAINER;
        listContainer.textContent = '';

        // Check if it's a list or a page
        if (currentPage.type === "list") {
            const listId = NavigationHelper.getCurrentListId();
            const lists = DataHelper.getLists(DataHelper.FILTERS.LIST_ID, listId);
            displayItemsOfAllLists(lists);
        } else {
            switch (currentPage) {
                case NavigationHelper.PAGES.today:
                    displayItemsOfAllLists(DataHelper.getLists(DataHelper.FILTERS.TODAY));
                    break;
                case NavigationHelper.PAGES.upcoming:
                    displayItemsOfAllLists(DataHelper.getLists(DataHelper.FILTERS.UPCOMING));
                    break;
                case NavigationHelper.PAGES.inbox:
                    displayItemsOfAllLists(DataHelper.getLists(), listId);
                    break;
                default:
                    break;
            }
        }

        // Set active styling
        const page_links = document.querySelectorAll(".page-link");
        page_links.forEach(page => {
            if (page.id === currentPage.id) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });

        // Also handle list styling
        const listItems = document.querySelectorAll("#lists li");
        listItems.forEach(li => li.classList.remove("active"));

        if (currentPage.type = "list") {
            const activeListItem = document.querySelector(`#lists li[data-list-id="${NavigationHelper.getCurrentListId()}"]`);
            if (activeListItem) activeListItem.classList.add("active");
        }

        // Set page title
        ELEMS.PAGE.TITLE.textContent = currentPage.title;
    }

    const init = function () {
        displayCurrentPage();
        displayLists();
        initializeListeners();
    };

    return { ELEMS, displayCurrentPage, init }
})();