import { DOMHelper } from "./DOMHelper";

export const NavigationHelper = (function() {
    const PAGES = {
        inbox: { // Shows everything
            id: "inbox",
            title: "Inbox",
            icon: "inbox"
        },
        today: { // Shows only tasks for the current date
            id: "today",
            title: "Today",
            icon: "today"
        },
        upcoming: { // Shows only task in the future
            id: "upcoming",
            title: "Upcoming",
            icon: "calendar_month"
        }
    }

    let currentPage = PAGES.inbox;

    const getCurrentPage = () => currentPage;

    const listenToPageClick = function() {
        const pages = DOMHelper.ELEMS.MENU.PAGE_LINKS;
        pages.forEach(page => {
            page.addEventListener("click", (event) => {
                // Set current page variable
                currentPage = PAGES[page.id];
                DOMHelper.displayCurrentPage();
            });
        });
    }

    const init = function () {
        listenToPageClick();
    };

    return { PAGES, getCurrentPage, init }
})();