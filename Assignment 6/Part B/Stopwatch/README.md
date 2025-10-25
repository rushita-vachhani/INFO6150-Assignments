# README.md for Part B: Event Stopwatch with Session Logging

## 1. Brief Description of the Application

This is a single-page web application designed to act as an advanced event stopwatch and session logger. It allows users to accurately time specific activities, associate them with a date and name, and persistently save the session history in the browser's `localStorage`. The application leverages modern JavaScript features (`Async`/`Await`/`Promises`) for reliable timer control and jQuery for enhanced UI validation and manipulation.


## 2. Features Implemented

### Timer & Core Logic
* Asynchronous Control Flow: Uses `Async`, `Await`, and `Promises` (`startInterval`) to manage the timer's asynchronous nature, ensuring robust control over starting and stopping the interval.
* Timekeeping: Employs `setInterval` and `clearInterval` for precise timing and displays the duration in HH:MM:SS format.
* Pause/Resume: Allows the user to temporarily pause the timer without losing accumulated time, with the button text dynamically changing between "Pause" and "Resume."

### Data Persistence & History
* Session Logging: The Stop & Save button stops the timer and saves the session details (`date`, `name`, `duration`, `raw seconds`) to `localStorage` for permanent persistence.
* Persistent History: Automatically loads and displays all past sessions from `localStorage` immediately upon page load.
* Statistics: Calculates and prominently displays the total number of sessions and the cumulative total time recorded.

### Validation and User Experience (UX)
* Strong Validation (jQuery): Uses jQuery for comprehensive validation on:
    * Date Field: Must not be empty.
    * Event Name: Required, minimum 3, maximum 100 characters, allowing only letters, numbers, spaces, hyphens, and apostrophes.
* Destructive Action Feedback: The Reset button shows a brief, non-disruptive success notification (auto-closing modal) to confirm the action, adhering to the "no pop-up alerts" rule.


## 3. Technologies Used (Detailed)

This project leverages modern front-end standards and client-side scripting libraries to meet all technical requirements:

* HTML5: Provides the semantic structure for the application pages.
    * Utilizes input types like `type="date"` and the semantic layout tags (`<header>`, `<main>`, `<section>`).
* CSS3: Manages the professional styling and visual presentation, using custom color variables (`:root`) and a clean aesthetic.
* CSS Flexbox and Grid:
    * Flexbox is essential for aligning the top navigation, arranging control buttons (`.btn-row`), and structuring history items.
    * Media Queries are used to switch the control buttons from a horizontal row to a vertical stack on mobile screens (below 600px) for improved usability.
* JavaScript (ES6+):
    * Forms the core logic using advanced features like `async`, `await`, and custom `Promise` creation for managing asynchronous timer operations.
    * Utilizes arrow functions and powerful native methods (e.g., `Array.reduce` for statistics).
* jQuery: Primary library used for all client-side validation mechanics, DOM manipulation, and dynamic UI updates.
    * Used for displaying error messages below fields and managing the enabled/disabled states of buttons/inputs.


## 4. How to Run the Application

1.  Save Files: Ensure all project files (`stopwatch.html`, `stopwatch.js`, and `style.css`) are saved in the correct directory structure.
2.  Open: Open `stopwatch.html` directly in any modern web browser.
3.  Use: Enter an event name and click "Start." Sessions will automatically be saved to your browser's `localStorage`.


## 5. Bonus Features Implemented

* Clear Filter Functionality: A dedicated "Clear Filter" button is implemented that removes the selected date filter and automatically refreshes the history list. The button is disabled when no filter is active (UX enhancement).
