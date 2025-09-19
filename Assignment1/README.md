# Healthy Recipes & Nutrition Tips — README

## 1) Project Overview
A single-page website with a sticky header, hero, “Nutrition Corner” (with table + details/summary + aside), a “Featured Recipes” section, a footer with contact information & form.

Files
```
index.html
style.css
assets/
  favicon.ico
  food-stack.svg
  toast.svg
  meal-prep-poster.jpg (optional)
  breakfast.mp3 (audio file)
README.md
```


## 2) How to Run
1. Maintain the folder structure as shown above.
2. Open `index.html` in any modern browser.


## 3) All HTML Tags Used (with short descriptions)
### Document & Head
`<!doctype html>` - Declares HTML5 document type.
`<html lang="en">` - Root element; `lang` assists screen readers.
`<head>` - Document metadata (not rendered).
`<meta charset="utf-8">` - Sets character encoding to UTF-8.
`<meta name="viewport" ...>` - Controls mobile viewport scaling.
`<title>` - Browser/tab title.
`<link rel="stylesheet" href="style.css">` - Loads external CSS.
`<link rel="icon" href="assets/favicon.ico" type="image/x-icon">` - Sets site favicon.

### Page Structure & Navigation
`<body>` - All visible page content.
`<header>` - Top banner area; contains logo and primary nav.
`<nav>` - Landmark for site navigation.
`<ul>` / `<li>` - Unordered list for navigation items.
`<a>` - Links to page anchors or external pages (`href`, `target`).

### Hero Section & Media
`<section>` - Semantic grouping (hero, nutrition, recipes, footer).
`<div>` - Generic block‐level container (layout hooks).
`<span>` - Generic inline container (badges/inline styles).
`<h1>`, `<h2>`, `<h3>`, `<h4>` - Headings, establish content hierarchy.
`<p>` - Paragraph text.
`<article>` - Self-contained content blocks (cards/panel).
`<iframe>` - Embeds YouTube player.
`<audio>` - Native audio player with `<source>`.
<source>` - Media source inside audio/video tags.
`<figure>` - Wraps media as a single unit (image).
`<img>` - Displays image; `alt` provides accessible text.
`<figcaption>` - Caption describing the figure.

### Nutrition Corner (Data & Interactivity)
`<table>` - Tabular data wrapper.
`<thead>` - Table header row group.
`<tbody>` - Table body rows.
`<tr>` - Table row.
`<th>` - Table header cell.
`<td>` - Table data cell.
`<details>` - Native disclosure widget (expand/collapse).
`<summary>` - Summary/label for details control.
`<aside>` - Complementary content (tip box) related to main content.

### Footer & Form
`<footer>` - Bottom section with contact and form.
`<form>` - Collects user input; can be submitted.
`<label>` - Accessible label for form fields; associates via `for`/`id`.
`<input type="text">` - Name field.
`<input type="email">` - Email field with built-in validation.
`<input type="password">` - Password field (masked).
`<input list="...">` - Text input with datalist suggestions.
`<datalist>` - Provides suggestions for an `<input>` via `list`.
`<option>` - Suggestion items inside `<datalist>`.
`<textarea>` - Multi-line text input (description).
`<button type="submit">` - Submit form button.
`<strong>` - Emphasized/strong text (semantic emphasis).
`<br>` - Line break (used sparingly in captions/details text).



## 4) Key Attributes Used (high-level)
`id` - Creates unique anchors for in-page links (e.g., `#recipes`, `#subscribe`).
`class` - Styling hooks for CSS.
`href` - Link targets (anchors, external URLs, `mailto:`, `tel:`).
`src` - Media/image source path.
`alt` - Accessible text for images.
`target="_blank"` - Opens link in a new tab.
`controls` - Shows audio player controls.
`type` - Input type (`email`, `password`, etc.).
`required`, `minlength` - Native form validation helpers.
`list` - Connects an `<input>` to a `<datalist>`.
`allowfullscreen`, `allow` - YouTube iframe playback permissions.
`aria-labelledby` - Improves accessibility by linking labels → sections.



## 5) Accessibility & Semantics Highlights
**Landmarks:** `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>` provide structure for assistive tech.
**Alt text:** All meaningful images have `alt` text.
**Headings:** Logical order (`h1` > `h2` > `h3`/`h4`).
**Captions:** `<figure>` with `<figcaption>` gives context to images.
**Forms:** `<label for="...">` keeps inputs accessible and clickable.
**Details/Summary:** Native keyboard-accessible expand/collapse control.



## 6) Features Checklist 
**Sticky header navigation** 
**Hero with media cards** (YouTube embed + audio) 
**Images with `<figure>` + `<figcaption>`** 
**Nutrition section with table** 
**`<details>` + `<summary>`** (fiber types explanation) 
**`mailto:` & `tel:` links** 
**Footer form** (name, email, password, topic with `datalist`, description) 
**Buttons consistent (`.btn .primary`)** 
**Favicon** 



## 7) Notes for Instructors / Reviewers
External stylesheet only (`style.css`), no frameworks or CSS variables.
No JavaScript is used; interactivity uses semantic HTML (`details/summary`).
Anchors (`#recipes`, `#nutrition-corner`, `#subscribe`) align with sticky header via `:target { scroll-margin-top: 80px; }`.

