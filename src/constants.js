export const X = Object.freeze({

});

// Page and navigation types 
export const PAGE_TYPES = Object.freeze({
    PAGE: 'page',
    LIST: 'list'
});

// Task priority levels
export const PRIORITY_LEVELS = Object.freeze({
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
});

// Filter types for displaying tasks
export const FILTER_TYPES = Object.freeze({
    ALL: 'ALL',
    TODAY: 'TODAY',
    UPCOMING: 'UPCOMING',
    LIST_ID: 'LIST_ID'
});

// Event names for EventBus
export const EVENTS = Object.freeze({
    PAGE_CHANGED: 'page-changed',
    TASK_CREATED: 'task-created',
    TASK_UPDATED: 'task-updated',
    TASK_DELETED: 'task-deleted',
    LIST_CREATED: 'list-created',
    LIST_DELETED: 'list-deleted'
});

// Storage keys for localStorage
export const STORAGE_KEYS = Object.freeze({
    LISTS: "toDoLists"
});

// Modal class names
export const MODALS = Object.freeze({
    TASK: '.add-edit-task-modal',
    LIST: '.add-edit-list-modal',
    DESTRUCTIVE: '.destructive'
});

// Error messages
export const ERROR_MESSAGES = Object.freeze({
    
});

// Confirmation messages
export const CONFIRM_MESSAGES = Object.freeze({
    DELETE_TASK: 'Are you sure you want to delete this task?',
    DELETE_LIST: 'Are you sure you want to delete this list? All tasks in it will be deleted.',
});

// Form field limits
export const LIMITS = Object.freeze({
    TITLE_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
    LIST_NAME_MAX_LENGTH: 50
});