# README.md for Part A: Calculator with User Login

## 1. Brief Description of the Application

This is a two-page web application designed to securely manage user access to a functional arithmetic calculator. The application enforces strong client-side validation using jQuery and employs modern JavaScript (ES6+) for its core logic and state management. The user must successfully authenticate before gaining access to the main calculator interface.



## 2. Features Implemented

### Authentication & Session Management
* Hardcoded User Validation: Checks input credentials against pre-defined users in `login.js`.
* Required Email Format: Enforces that the Email field is a valid email format and must end with `@northeastern.edu`.
* Password Requirements: Validates that the Password field is not empty and has a minimum length of 8 characters.
* Dynamic Button Control: The "Login" button remains disabled until both the Email and Password fields pass all validation checks.
* Session Persistence Control: The "Remember Me" checkbox dynamically stores the session in `localStorage` (persistent) or `sessionStorage` (session-only).
* Secure Redirection: On page load, `calculator.html` verifies the existence of a valid session; if absent, the user is immediately redirected to `login.html`.

### Calculator Functionality
* Single Arrow Function: All four arithmetic operations are processed exclusively by one required ES6 arrow function, `const calculate = (num1, num2, operation) => { ... }`.
* Input Validation: Ensures both number inputs are present and contain valid numeric data (including decimals and negative numbers) before processing.
* Edge Case Handling: Includes specific logic to handle division by zero, returning a graceful error message.
* Smooth UI Updates: The result is displayed using jQuery chaining (`.val(result).fadeOut().fadeIn()`) for a visual update effect.



## 3. Technologies Used (Detailed)

This project leverages modern front-end standards and client-side scripting libraries to meet all technical requirements:

* HTML5:
    * Provides the semantic structure for the login form and calculator interface.
    * Utilizes the standard tags (`<header>`, `<main>`, `<section>`) and input attributes necessary for a modern web application.
* CSS3:
    * Manages the professional styling and visual presentation, including custom color variables (`:root`) for a consistent color scheme.
    * Handles Responsive Web Design, ensuring optimal display on varying screen sizes, including mobile devices.
* CSS Flexbox and Grid:
    * Flexbox is used for precise alignment and spacing within linear components (e.g., the top navigation bar and button rows).
    * CSS Grid is explicitly used for organizing the side-by-side Number input fields, demonstrating proficiency in both layout systems.
* JavaScript (ES6+):
    * Forms the logical core of the application, handling complex control flow and conditional logic.
    * Features required for the assignment, such as ES6 Arrow Functions and native Web APIs like `localStorage` and `sessionStorage`, are extensively utilized.
* jQuery (v3.7.1):
    * Serves as the primary library for all validation and DOM manipulation.
    * Used to simplify event binding (e.g., binding `keyup`, `blur`, and `focus` events simultaneously) and execute powerful chained UI animations (e.g., fade effects on login success and logout).



## 4. How to Run the Application

1.  Save Files: Ensure all project files (`login.html`, `calculator.html`, `login.js`, `calculator.js`, and `style.css`) are saved in the correct directory structure.
2.  Open: Open `login.html` directly in any modern web browser.
3.  Login Credentials: Use one of the hardcoded user credentials found in `login.js`:
    * Email: `rv@northeastern.edu` | Password: `va@@@5495`
    * Email: `demo@northeastern.edu` | Password: `12345678`
4.  Access Calculator: Upon entering valid credentials, the page will display a success message and redirect to `calculator.html` after 2 seconds.



