# 🎵 Concert Ticket Booking Website - Assignment 7

## Explanation of SASS/SCSS Features Implemented

This project demonstrates advanced SASS/SCSS concepts through a two-page responsive website (`index.html` and `book.html`).  
Below are all the features implemented as per assignment requirements:

1. **Variables**  
   Reusable SASS variables are defined for colors, fonts, spacing, and breakpoints in `scss/base/_variables.scss`.  
   ```scss
   $color-primary: #ff3366;
   $font-stack: 'Poppins', sans-serif;
   $space-lg: 1.5rem;

2. **CSS Custom Properties**
CSS variables (--property) are used alongside SASS variables to support dynamic theming.

:root { --transition-fast: 0.15s ease; }
.theme-dark { --bg-page: #0f0f10; --text-main: #f4f4f4; }

3. **Nesting**
Nested selectors make the SCSS file structure cleaner and more readable.
.event-card {
  &__img { border-radius: 8px; }
  &__title { color: $color-primary; }
}

4. **Interpolation**
Dynamic class names are generated using interpolation (#{$variable}) inside loops.
@each $i, $img in $event-images {
  .img--#{$i} { background-image: $img; }
}

5. **Placeholder Selectors (%)**
Placeholders are used to define reusable style blocks extended in multiple components.

%btn-base { display: inline-block; padding: .75rem 1.5rem; }
.btn { @extend %btn-base; }

6. **Mixins**
Mixins are used to create reusable style snippets for Flexbox, Grid, and responsive media queries.
@mixin flex-center { display: flex; justify-content: center; align-items: center; }

7. **Functions**
Custom SASS functions are written for calculations and breakpoint lookups.
@function rem($px) { @return ($px / 16) * 1rem; }
@function bp($name) { @return map-get($breakpoints, $name); }

8. **Additional Advanced Features**
Maps: Used for $breakpoints and $event-images to store key-value pairs.
Loops (@each): Automatically generate repetitive styles for multiple image classes.
Conditionals (@if/@else): Implemented in pages/_book.scss for theme-based styling.
Modular Architecture: Organized SCSS into partials (base/, layout/, components/, pages/) and imported via @use in style.scss.


##Instructions for Setting Up and Running the Project##
1. Extract or Clone the Project
git clone https://github.com/<your-username>/concert-booking.git
cd concert-booking
- Or extract the ZIP submitted on Canvas.

2. Install SASS (if not installed)
npm install -g sass

3. Compile SCSS to CSS
Run the following command from the project root:
sass --watch scss/style.scss css/style.css
This automatically compiles all SCSS partials into a single CSS file.

4. Open the Website
Launch index.html → Home page
Launch book.html → Ticket booking page

