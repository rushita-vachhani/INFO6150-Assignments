# Assignment 4: Advanced Feedback Form with Form Helper

## Overview
This project implements a comprehensive feedback form for Assignment 4, focusing on advanced client-side validation, enhanced user experience features, and dynamic form manipulation.

**Key Goals Achieved:**
* **100% Client-Side Validation:** Form submission is disabled until all mandatory fields pass checks on key events (input, blur).
* **Dynamic UI:** Fields are added or changed dynamically based on user selection (e.g., the Drinks list).
* **Form Helper (AI Assistant):** A custom chatbot is included to answer specific, pre-defined user questions about form requirements and formats.
* **Data Persistence:** Successfully submitted data is recorded and displayed in a persistent HTML table on the same page.

---

## Implementation Details

### A. Key HTML Structure Explanation (`Form.html`)

| HTML Tag / Element | Purpose (1-2 Sentences) |
| :--- | :--- |
| `<div id="container">` | The main content wrapper, which centers the form on the page and provides the base background color. |
| `<div class="form-group-inline">` | The primary layout container for each field; it ensures consistent vertical spacing and prevents layout jumps when error messages appear. |
| `<select id="drinks">` | A single select list box containing 5 drink options, triggering the dynamic form change when a drink is selected. |
| `<div id="dynamicContentContainer">` | A placeholder used by JavaScript to inject the dynamic **"Large drink" checkbox** and the conditional **"Special Request"** text field. |
| `<input id="address2">` | Represents the **Street Address 2** field, which is specifically the only non-mandatory (optional) field in the form. |
| `<div id="address2Counter">` | A live display element that shows the user the real-time count of characters used in the Street Address 2 field. |
| `<button id="aiBtn">` | The fixed-position "AI Assistant" button, which toggles the visibility of the Form Helper chat panel when clicked. |
| `<div id="aiPanel" class="ai-panel">` | The fixed-position chat window that hosts the conversation history and input box for the Form Helper/Chatbot. |
| `<div id="results">` | The container where the HTML table of all previous and current successful form submissions is displayed. |

### B. Key JavaScript Feature Explanation (`script.js`)

| JS Function / Component | Purpose (1-2 Sentences) |
| :--- | :--- |
| `validateAll()` | The master function that checks the validity of every mandatory field and controls the disabled state of the `Submit` button. |
| `setError()` / `clearError()` | Core helpers that handle displaying and removing the red error text and outlines (Dynamic Error Highlighting) next to fields. |
| `sanitizeAlnum()` | Automatically removes special characters from the First Name and Last Name fields, enforcing an alphanumeric rule. |
| `maskPhoneOnInput()` | Implements **Input Masking** by formatting the Phone Number field into the required