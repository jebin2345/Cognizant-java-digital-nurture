// Basic setup and welcome message
console.log("Welcome to the Community Portal");

window.addEventListener('load', function() {
    alert("Page fully loaded! Welcome to our Community Event Portal.");
});
// Event data management
const eventName = "Summer Music Festival";
const eventDate = "2023-06-15";
let availableSeats = 200;

function updateSeatsDisplay() {
    const seatsElement = document.querySelector('.eventCard p:nth-child(3)');
    if (seatsElement) {
        seatsElement.textContent = `Available seats: ${availableSeats}`;
    }
}

function registerForEvent() {
    if (availableSeats > 0) {
        availableSeats--;
        updateSeatsDisplay();
        return `Successfully registered for ${eventName} on ${eventDate}. ${availableSeats} seats remaining.`;
    } else {
        return "Sorry, this event is fully booked!";
    }
}

// Display event info using template literals
function displayEventInfo() {
    const eventInfo = `
        Event: ${eventName}
        Date: ${new Date(eventDate).toLocaleDateString()}
        Seats Available: ${availableSeats}
    `;
    console.log(eventInfo);
}
// Event validation and display
const events = [
    { name: "Summer Music Festival", date: "2023-06-15", seats: 120, totalSeats: 200 },
    { name: "Farmers Market", date: "2023-06-17", seats: 0, totalSeats: 0 },
    { name: "Community Workshop", date: "2023-06-20", seats: 15, totalSeats: 30 },
    { name: "Book Fair", date: "2023-06-22", seats: 45, totalSeats: 60 }
];

function displayValidEvents() {
    const currentDate = new Date();
    const validEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= currentDate && (event.seats > 0 || event.totalSeats === 0);
    });

    console.log("Upcoming events with available seats:");
    validEvents.forEach(event => {
        console.log(`${event.name} - ${event.date} - Seats: ${event.seats}/${event.totalSeats}`);
    });

    return validEvents;
}

function registerUser(eventIndex) {
    try {
        if (eventIndex < 0 || eventIndex >= events.length) {
            throw new Error("Invalid event index");
        }
        
        const event = events[eventIndex];
        if (new Date(event.date) < new Date()) {
            throw new Error("Cannot register for past events");
        }
        
        if (event.seats <= 0 && event.totalSeats > 0) {
            throw new Error("Event is fully booked");
        }
        
        if (event.totalSeats > 0) {
            event.seats--;
            console.log(`Successfully registered for ${event.name}. Remaining seats: ${event.seats}`);
            return true;
        }
        
        return true; // For events with no seat limit
    } catch (error) {
        console.error("Registration failed:", error.message);
        return false;
    }
}
// Event management functions
function createEventManager() {
    let totalRegistrations = 0;
    const categories = {};
    
    function addEvent(name, date, category, seats) {
        const event = { name, date, category, seats };
        events.push(event);
        categories[category] = categories[category] || { count: 0, events: [] };
        categories[category].events.push(event);
        return event;
    }
    
    function registerUser(eventName) {
        const event = events.find(e => e.name === eventName);
        if (!event) return false;
        
        if (event.seats > 0) {
            event.seats--;
            totalRegistrations++;
            categories[event.category].count++;
            return true;
        }
        return false;
    }
    
    function filterEventsByCategory(category, callback) {
        const filtered = events.filter(e => e.category === category);
        if (callback) callback(filtered);
        return filtered;
    }
    
    function getCategoryStats(category) {
        return categories[category] || { count: 0, events: [] };
    }
    
    return {
        addEvent,
        registerUser,
        filterEventsByCategory,
        getCategoryStats,
        getTotalRegistrations: () => totalRegistrations
    };
}

const eventManager = createEventManager();

// Initialize some events
eventManager.addEvent("Jazz Night", "2023-07-10", "music", 50);
eventManager.addEvent("Food Festival", "2023-07-15", "food", 100);
// Event object constructor
function Event(name, date, category, totalSeats) {
    this.name = name;
    this.date = date;
    this.category = category;
    this.totalSeats = totalSeats;
    this.availableSeats = totalSeats;
}

Event.prototype.checkAvailability = function() {
    return this.availableSeats > 0 && new Date(this.date) >= new Date();
};

Event.prototype.register = function() {
    if (this.checkAvailability()) {
        this.availableSeats--;
        return true;
    }
    return false;
};

// Create some event objects
const musicEvent = new Event("Rock Concert", "2023-08-20", "music", 200);
const workshopEvent = new Event("Coding Workshop", "2023-09-05", "education", 30);

// Display object entries
function displayEventDetails(event) {
    const entries = Object.entries(event);
    console.log(`Details for ${event.name}:`);
    entries.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}
// Array operations for events
function manageEventArrays() {
    // Add new events
    events.push({
        name: "Art Exhibition",
        date: "2023-07-25",
        category: "art",
        seats: 80,
        totalSeats: 100
    });
    
    // Filter music events
    const musicEvents = events.filter(event => event.category === "music");
    console.log("Music events:", musicEvents);
    
    // Map to display cards
    const eventCards = events.map(event => {
        return {
            title: `${event.name} (${event.category})`,
            description: `On ${event.date} - ${event.seats}/${event.totalSeats} seats available`,
            isUpcoming: new Date(event.date) >= new Date()
        };
    });
    
    console.log("Event cards:", eventCards);
    return eventCards;
}
// DOM manipulation for event display
function renderEvents() {
    const eventsContainer = document.createElement('div');
    eventsContainer.id = 'events-container';
    eventsContainer.className = 'events-grid';
    
    events.forEach(event => {
        if (new Date(event.date) >= new Date()) {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p class="date">${new Date(event.date).toLocaleDateString()}</p>
                <p>Category: ${event.category}</p>
                <p>Seats: ${event.seats}/${event.totalSeats || 'Unlimited'}</p>
                <button class="register-btn" data-event="${event.name}">Register</button>
            `;
            
            eventsContainer.appendChild(eventCard);
        }
    });
    
    const main = document.querySelector('main');
    const existingContainer = document.getElementById('events-container');
    if (existingContainer) {
        main.replaceChild(eventsContainer, existingContainer);
    } else {
        main.insertBefore(eventsContainer, main.firstChild);
    }
    
    // Add event listeners to register buttons
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventName = this.getAttribute('data-event');
            handleRegistration(eventName);
        });
    });
}

function handleRegistration(eventName) {
    const event = events.find(e => e.name === eventName);
    if (!event) return;
    
    if (eventManager.registerUser(eventName)) {
        alert(`Successfully registered for ${eventName}!`);
        renderEvents(); // Refresh the display
    } else {
        alert(`Sorry, ${eventName} is no longer available.`);
    }
}
// Event handlers for interactive elements
function setupEventHandlers() {
    // Registration form submission
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.elements.name.value;
            const email = this.elements.email.value;
            const eventType = this.elements.eventType.value;
            
            console.log(`Registration attempt: ${name}, ${email}, ${eventType}`);
            alert(`Thank you ${name}! Your registration for ${eventType} events has been received.`);
            this.reset();
        });
    }
    
    // Category filter
    const categoryFilter = document.createElement('select');
    categoryFilter.id = 'category-filter';
    categoryFilter.innerHTML = `
        <option value="">All Categories</option>
        <option value="music">Music</option>
        <option value="food">Food</option>
        <option value="sports">Sports</option>
        <option value="art">Art</option>
        <option value="education">Education</option>
    `;
    
    categoryFilter.addEventListener('change', function() {
        const category = this.value;
        const filteredEvents = category ? 
            events.filter(e => e.category === category && new Date(e.date) >= new Date()) :
            events.filter(e => new Date(e.date) >= new Date());
        
        console.log(`Filtered events (${category || 'all'}):`, filteredEvents);
        // In a real app, we would update the DOM here
    });
    
    document.querySelector('main').prepend(categoryFilter);
    
    // Quick search by name
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search events...';
    searchInput.id = 'event-search';
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            const results = events.filter(e => 
                e.name.toLowerCase().includes(searchTerm) && 
                new Date(e.date) >= new Date()
            );
            console.log(`Search results for "${searchTerm}":`, results);
            // In a real app, we would update the DOM here
        }
    });
    
    document.querySelector('main').prepend(searchInput);
}
// Async operations for event data
async function fetchEvents() {
    try {
        // Show loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.textContent = 'Loading events...';
        document.querySelector('main').prepend(spinner);
        
        // Mock API endpoint
        const response = await fetch('https://mocki.io/v1/d4f6b911-2b9b-4e0b-9e8a-1e8b6b9b4e0b');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched events:', data);
        
        // Process and display events
        data.forEach(event => {
            events.push(event);
        });
        
        renderEvents();
    } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to load events. Please try again later.');
    } finally {
        // Remove loading spinner
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) spinner.remove();
    }
}

// Alternative with .then() and .catch()
function fetchEventsTraditional() {
    // Show loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.textContent = 'Loading events...';
    document.querySelector('main').prepend(spinner);
    
    fetch('https://mocki.io/v1/d4f6b911-2b9b-4e0b-9e8a-1e8b6b9b4e0b')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched events:', data);
            data.forEach(event => {
                events.push(event);
            });
            renderEvents();
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            alert('Failed to load events. Please try again later.');
        })
        .finally(() => {
            // Remove loading spinner
            const spinner = document.querySelector('.loading-spinner');
            if (spinner) spinner.remove();
        });
}
// Modern JavaScript features
function useModernFeatures() {
    // Default parameters
    function createEvent(name, date, category = 'general', seats = 0) {
        return { name, date, category, seats };
    }
    
    // Destructuring
    const { name: eventName, date: eventDate } = events[0] || {};
    console.log(`First event: ${eventName} on ${eventDate}`);
    
    // Spread operator
    const eventCopy = [...events];
    const upcomingEvents = [...events].filter(e => new Date(e.date) >= new Date());
    
    // Rest parameters
    function logEvents(...eventList) {
        eventList.forEach((event, i) => {
            console.log(`Event ${i + 1}: ${event.name}`);
        });
    }
    
    // Arrow functions
    const getEventTitles = () => events.map(e => e.name);
    
    return {
        createEvent,
        eventCopy,
        upcomingEvents,
        getEventTitles
    };
}
// Form handling improvements
function enhanceForms() {
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.elements.name.value.trim(),
                email: this.elements.email.value.trim(),
                date: this.elements.date.value,
                eventType: this.elements.eventType.value,
                message: this.elements.message.value.trim()
            };
            
            // Validate inputs
            if (!formData.name || !formData.email || !formData.eventType) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            try {
                // Simulate API call
                const response = await submitRegistration(formData);
                
                // Show success message
                const confirmationMsg = document.getElementById('confirmationMsg');
                if (confirmationMsg) {
                    confirmationMsg.innerHTML = `
                        <div class="alert success">
                            ✅ Registration successful!<br>
                            Confirmation sent to ${formData.email}
                        </div>
                    `;
                }
                
                // Reset form
                this.reset();
                
                // Update events display
                renderEvents();
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again.');
            }
        });
    }
    
    // Mock form submission
    async function submitRegistration(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random failure
                if (Math.random() < 0.1) {
                    reject(new Error('Server error'));
                } else {
                    console.log('Registration submitted:', data);
                    resolve({ status: 'success', data });
                }
            }, 1000);
        });
    }
}
// AJAX form submission
async function submitEventRegistration(formData) {
    try {
        const response = await fetch('https://mocki.io/v1/d4f6b911-2b9b-4e0b-9e8a-1e8b6b9b4e0b', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Registration successful:', data);
        return data;
    } catch (error) {
        console.error('Error submitting registration:', error);
        throw error;
    }
}

// Simulate delayed response
function simulateDelayedAction(action, delay = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            action();
            resolve();
        }, delay);
    });
}
// Debugging utilities
function setupDebugging() {
    // Log all form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            console.group('Form Submission');
            console.log('Form ID:', this.id);
            Array.from(this.elements).forEach(element => {
                if (element.name) {
                    console.log(`${element.name}: ${element.value}`);
                }
            });
            console.groupEnd();
        });
    });
    
    // Debug event listeners
    function debugEventListeners() {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const listeners = getEventListeners(element);
            if (Object.keys(listeners).length > 0) {
                console.group(`Event listeners on ${element.tagName}.${element.className}`);
                Object.entries(listeners).forEach(([event, handlers]) => {
                    console.log(`${event}: ${handlers.length} handler(s)`);
                    handlers.forEach(handler => {
                        console.log(handler.listener.toString());
                    });
                });
                console.groupEnd();
            }
        });
    }
    
    // Expose for debugging in console
    window.debug = {
        events,
        eventManager,
        renderEvents,
        debugEventListeners
    };
}
// jQuery compatibility
function setupJQueryCompatibility() {
    // Only load jQuery if not already present
    if (typeof window.jQuery === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = initJQueryFeatures;
        document.head.appendChild(script);
    } else {
        initJQueryFeatures();
    }
    
    function initJQueryFeatures() {
        // Use jQuery if available
        if (typeof window.jQuery !== 'undefined') {
            const $ = window.jQuery;
            
            // Fade in event cards
            $('.event-card').hide().fadeIn(1000);
            
            // Click handler for register buttons
            $(document).on('click', '.register-btn', function() {
                const eventName = $(this).data('event');
                handleRegistration(eventName);
                $(this).text('Registered!').prop('disabled', true);
            });
            
            // Benefit of frameworks mention
            console.log('With frameworks like React or Vue, we could:');
            console.log('- Manage state more efficiently');
            console.log('- Create reusable components');
            console.log('- Enjoy better performance with virtual DOM');
            console.log('- Benefit from rich ecosystem of tools and libraries');
        }
    }
}
// Initialize the application
window.addEventListener('DOMContentLoaded', function() {
    console.log('Community Portal initialized');
    
    // Basic setup
    displayEventInfo();
    
    // Setup event data
    eventManager.addEvent("Summer Music Festival", "2023-06-15", "music", 200);
    eventManager.addEvent("Farmers Market", "2023-06-17", "food", 0);
    eventManager.addEvent("Community Workshop", "2023-06-20", "education", 30);
    
    // DOM manipulation
    renderEvents();
    setupEventHandlers();
    
    // Form enhancements
    enhanceForms();
    
    // Debugging
    setupDebugging();
    
    // Fetch events from API
    fetchEvents();
    
    // jQuery compatibility
    setupJQueryCompatibility();
    
    // Modern features
    useModernFeatures();
});