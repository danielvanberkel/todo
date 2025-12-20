export const EventBus = (function() {
    const events = {};

    // Register listener
    const on = function(eventName, callback) {
        if (!events[eventName]) { 
            events[eventName] = []; // If key does not yet exist, create it and set an empty array as value
        }

        events[eventName].push(callback); // Add the callback function to the existing array
    };

    // Execute all registered callbacks for an event
    const emit = function(eventName, data) {
        if (!events[eventName]) return; // No listeners? Do nothing.
        events[eventName].forEach(callback => {
            callback(data)
        }); // Otherwise, execute all callbacks.
    };

    return { on, emit }
})();