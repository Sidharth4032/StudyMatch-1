// eventmanage.js
const fs = require('fs');
const path = require('path');

// Mock data for demonstration purposes
let events = [
    { id: 1, title: 'Project Meeting', start: new Date(), end: new Date(), description: 'Discuss project milestones' },
    // Additional sample events can be added here
];

/**
 * Validates event data.
 * @param {object} eventData - The event data to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
const isValidEvent = (eventData) => {
    const { title, start, end, description } = eventData;
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return false;
    }
    if (!(start instanceof Date) || !(end instanceof Date) || start >= end) {
        return false;
    }
    if (description && typeof description !== 'string') {
        return false;
    }
    return true;
};

/**
 * Adds a new event.
 * @param {object} eventData - The event data to add.
 * @returns {object} The added event.
 */
const addEvent = (eventData) => {
    if (!isValidEvent(eventData)) {
        throw new Error('Invalid event data');
    }
    const newEvent = { id: events.length + 1, ...eventData };
    events.push(newEvent);
    logEventAction('add', newEvent);
    return newEvent;
};

/**
 * Updates an event by its ID.
 * @param {number} id - The ID of the event to update.
 * @param {object} eventData - The new event data.
 * @returns {object|null} The updated event or null if not found.
 */
const updateEvent = (id, eventData) => {
    if (!isValidEvent(eventData)) {
        throw new Error('Invalid event data');
    }
    let updatedEvent = null;
    events = events.map(event => {
        if (event.id === id) {
            updatedEvent = { ...event, ...eventData };
            return updatedEvent;
        }
        return event;
    });
    if (updatedEvent) {
        logEventAction('update', updatedEvent);
    }
    return updatedEvent;
};

/**
 * Deletes an event by its ID.
 * @param {number} id - The ID of the event to delete.
 * @returns {boolean} True if the event was deleted, otherwise false.
 */
const deleteEvent = (id) => {
    const initialLength = events.length;
    events = events.filter(event => event.id !== id);
    const wasDeleted = initialLength !== events.length;
    if (wasDeleted) {
        logEventAction('delete', { id });
    }
    return wasDeleted;
};

/**
 * Retrieves an event by its ID.
 * @param {number} id - The ID of the event to retrieve.
 * @returns {object|null} The retrieved event or null if not found.
 */
const getEventById = (id) => {
    const event = events.find(event => event.id === id);
    return event || null;
};

/**
 * Lists all events.
 * @returns {object[]} The list of events.
 */
const listEvents = () => {
    return events;
};

/**
 * Logs an event action to a file.
 * @param {string} action - The action (add, update, delete).
 * @param {object} eventData - The event data related to the action.
 */
const logEventAction = (action, eventData) => {
    const logFile = path.join(__dirname, 'event.log');
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - Action: ${action}, Event: ${JSON.stringify(eventData)}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) throw err;
    });
};

// Export the event management functions
module.exports = {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    listEvents
};

/**
 * Searches events by title.
 * @param {string} searchQuery - The search query for the event title.
 * @returns {object[]} The list of events that match the query.
 */
const searchEventsByTitle = (searchQuery) => {
    return events.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()));
};

/**
 * Sorts events by start time.
 * @param {boolean} ascending - Whether to sort in ascending order.
 * @returns {object[]} The sorted list of events.
 */
const sortEventsByStartTime = (ascending = true) => {
    return events.slice().sort((a, b) => {
        return ascending ? a.start - b.start : b.start - a.start;
    });
};

/**
 * Sorts events by creation time.
 * @param {boolean} ascending - Whether to sort in ascending order.
 * @returns {object[]} The sorted list of events.
 */
const sortEventsByCreationTime = (ascending = true) => {
    return events.slice().sort((a, b) => {
        const aCreationTime = new Date(a.createdAt || 0).getTime();
        const bCreationTime = new Date(b.createdAt || 0).getTime();
        return ascending ? aCreationTime - bCreationTime : bCreationTime - aCreationTime;
    });
};

/**
 * Saves the current state of events to a file.
 */
const saveEventsToFile = () => {
    const filePath = path.join(__dirname, 'events.json');
    fs.writeFile(filePath, JSON.stringify(events, null, 2), (err) => {
        if (err) throw err;
        console.log('Events saved to file.');
    });
};

/**
 * Loads events from a file.
 */
const loadEventsFromFile = () => {
    const filePath = path.join(__dirname, 'events.json');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('No saved events file found. Starting with an empty list.');
                events = [];
            } else {
                throw err;
            }
        } else {
            events = JSON.parse(data);
            console.log('Events loaded from file.');
        }
    });
};


// Continue exporting the additional functions
module.exports = {
    // Existing exports
    searchEventsByTitle,
    sortEventsByStartTime,
    sortEventsByCreationTime,
    saveEventsToFile,
    loadEventsFromFile
};

// Initial load of events from file
loadEventsFromFile();

