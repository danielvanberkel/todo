import { EventBus } from "./EventBus";
import { PAGE_TYPES, EVENTS } from "./constants";

export const NavigationHelper = (function() {
    const PAGES = {
        inbox: { // Shows everything
            id: "inbox",
            title: "Inbox",
            icon: "inbox",
            type: PAGE_TYPES.PAGE
        },
        today: { // Shows only tasks for the current date
            id: "today",
            title: "Today",
            icon: "today",
            type: PAGE_TYPES.PAGE
        },
        upcoming: { // Shows only task in the future
            id: "upcoming",
            title: "Upcoming",
            icon: "calendar_month",
            type: PAGE_TYPES.PAGE
        }
    }

    let currentPage = PAGES.inbox;
    let currentListId = null;

    const getCurrentPage = () => currentPage;
    const getCurrentListId = () => currentListId;

    const setPage = function(pageId) {
        currentPage = PAGES[pageId];
        currentListId = null;
        EventBus.emit(EVENTS.PAGE_CHANGED);
    }

    const setList = function(listId, listName) {
        currentPage = {
            id: `list-${listId}`,
            title: listName,
            type: PAGE_TYPES.LIST
        };
        currentListId = listId;
        EventBus.emit(EVENTS.PAGE_CHANGED);
    }

    const listenToPageClick = function() {
        const pages = document.querySelectorAll(".page-link");
        pages.forEach(page => {
            page.addEventListener("click", (event) => {
                // Set current page variable
                setPage(page.id);
            });
        });
    }

    const init = function () {
        listenToPageClick();
    };

    return { PAGES, getCurrentPage, init, getCurrentListId, setList, setPage }
})();