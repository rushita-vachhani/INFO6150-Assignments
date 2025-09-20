# Rushita Vachhani – Portfolio (Assignment 2)

A responsive, single-page personal portfolio that fulfills the Assignment 2 requirements:
semantic HTML, responsive layout (Grid + Flexbox), image gallery with hover, table-based
contact form, external stylesheet, favicon, and accessible markup.

---

## Folder Structure

```text
Assignment2/
├── assets/
│   ├── DCP_Port.png
│   ├── Ono_Teas.png
│   ├── profile.jpg
│   └── favicon.ico
├── index.html
├── style.css
└── README.md

All images and the favicon live in /assets.

## HTML Tags
* `<nav aria-label="Primary">`: Wraps the main navigation links. `aria-label` gives a clear name to assistive technologies.

* `<input type="checkbox" id="nav-toggle" class="nav-toggle">`: Invisible checkbox used to toggle the mobile menu with pure CSS. The checked state drives the open/close styles.

* `<label for="nav-toggle" class="nav-toggle-btn">`: Clicking the label toggles the checkbox, which opens/closes the menu. Contains the “hamburger” bars.

* `<span class="bar">`: A single bar used for the hamburger icon. The other two bars are drawn with CSS `::before` and `::after`.

* `<section id="home" class="hero">`: Groups the hero content into a logical, landmark section. The `id` enables anchor links from the nav.

* `<div class="container">`: Centers content and sets a max width. Keeps layout consistent across sections.

* `<h1>`, `<h2>`, `<h3>`: Heading hierarchy for titles and subsections. Improves accessibility, SEO, and in-page navigation.

* `<p>`: Paragraph text. Used for intros, descriptions, and testimonials.

* `<a href="..." target="_blank" rel="noopener">`: Link element for navigation or external sites. `target="_blank"` opens in a new tab and `rel="noopener"` is a security best practice.

* `<img src="..." alt="...">`: Displays images (profile and portfolio). `alt` text is essential for accessibility and SEO.

* `<svg>` and `<path>`: Inline vector graphics for crisp social icons at any size. `<path d="...">` defines the icon shape.

* `<ul>` / `<li>`: Unordered lists for nav items and pill tags. Screen readers understand them as lists.

* `<aside class="skills-board">`: Marks complementary content (technical skills) alongside the main “About” text. Aids semantics and layout.

* `<article class="t-card">`: Self-contained testimonial content block. Semantically suitable for independent items/cards.

* `<blockquote>`: Indicates quoted testimonial text. Screen readers announce it as a quotation.

* `<table>` / `<caption>` / `<tbody>` / `<tr>` / `<td>`: Used for the “table layout” requirement in the contact form. `<caption>` provides an accessible title.

* `<textarea>` / `<button type="submit">`: Multiline message input and a submit button for the form. Both are keyboard and screen-reader friendly.

* `<footer>`: Site footer with back-to-top link and copyright. Provides a consistent end landmark for the page.

* Global attributes: `id`, `class`, `aria-label`, `aria-hidden`, `role`, `download`: `id` anchors sections; `class` targets CSS; ARIA/role improve assistive tech; `download` prompts saving a file.


## CSS Features & Selectors
* `:root + CSS variables (--teal, --bg-1, etc.)`: Centralizes theme colors and tokens for easy updates. Use var(--name) everywhere to keep styles consistent.

* Universal selector `* { box-sizing: border-box; }`: Includes borders/padding in element size calculations. Prevents layout “blow-ups” from padding.

* Layout containers `(.container)`: Sets max width and horizontal padding. Keeps content aligned and readable on large screens.

* Positioning (`position: sticky, absolute, relative, z-index`): Makes the header stick to the top while scrolling. Positions menus/overlays precisely above content.

* Effects (`backdrop-filter: blur(8px)`): Blurs content behind the semi-transparent header. Creates a polished glassy look.

* Flexbox (`display: flex`): Aligns and spaces items in the header and mobile stacks. Simple and powerful for 1-D layouts.

* CSS Grid (`display: grid`): Builds the hero and card grids cleanly. Great for 2-D layouts with columns and rows.

* Responsive rules (`@media (...)`): Adjusts typography, grid columns, and image sizes for tablets/phones. Ensures the site is mobile-friendly.

* Visual polish (`border-radius, box-shadow, object-fit: cover`): Rounded corners and soft shadows create depth. `object-fit` keeps images neatly cropped.

* Transitions & transforms (`transition, transform`): Smooth hover animations and overlay slide-ups. Enhances perceived performance and interactivity.

* Pseudo-classes (`:hover, :focus-within, :checked`): Style links on hover, reveal overlays on focus, and open the mobile nav via the checkbox hack.

* Pseudo-elements (`::before, ::after`): Draw extra hamburger bars without extra markup. Also handy for decorative lines/badges.

* Combinators (`+, ~`): `.nav-toggle:checked + .nav-toggle-btn` morphs the hamburger to “X”. `.nav-toggle:checked ~ .nav` opens the menu panel.

* Modern selectors (`:is(input, textarea)`): Applies the same rules to multiple targets concisely. Reduces repetition and keeps CSS tidy.

* Scrolling offsets (`scroll-margin-top`): Prevents anchored sections from hiding under the sticky header. Improves in-page navigation.

* Stacking & isolation (`isolation: isolate, overflow: hidden`): Keeps overlays/cards rendering on their own layers. Avoids unexpected blending/bleed.