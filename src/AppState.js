import { EventBus } from "./EventBus";

export const AppState = (function() {
    let state = {
        lists: [],
        currentPage: null,
        currentListId: null,
    }

    const getState = () => ({ ...state }); // Returns copy instead of reference

    const updateState = function(updates) {
        state = { ...state, ...updates};
        EventBus.emit('state-changed', state);
    }

    const getLists = () => state.lists;
    const getCurrentPage = () => state.currentPage;

    return { getState, updateState, getLists, getCurrentPage }

})();