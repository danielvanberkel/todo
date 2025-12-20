import { EventBus } from "./EventBus";

export const NavigationHelper = (function() {
    const PAGES = {
        inbox: { // Shows everything
            id: "inbox",
            title: "Inbox",
            icon: "inbox",
            type: "page"
        },
        today: { // Shows only tasks for the current date
            id: "today",
            title: "Today",
            icon: "today",
            type: "page"
        },
        upcoming: { // Shows only task in the future
            id: "upcoming",
            title: "Upcoming",
            icon: "calendar_month",
            type: "page"
        }
    }

    let currentPage = PAGES.inbox;
    let currentListId = null;

    const getCurrentPage = () => currentPage;
    const getCurrentListId = () => currentListId;

    const setPage = function(pageId) {
        currentPage = PAGES[pageId];
        currentListId = null;
        EventBus.emit('page-changed');
    }

    const setList = function(listId, listName) {
        currentPage = {
            id: `list-${listId}`,
            title: listName,
            type: "list"
        };
        currentListId = listId;
        EventBus.emit('page-changed');
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