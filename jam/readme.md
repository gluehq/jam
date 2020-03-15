![Jam logo](docs/images/jam-logo.png)

<style>[alt="Jam logo"] {width: 150px;}</style>

Jam is a CSS Grid based grid system for creating common page layouts with predefined responsive behaviour. It is intentionally subjective in order to be simple enough for HTML beginners or CMS operators to understand and as such is not a fully customisable grid system.

Jam should be used to produce basic page layouts which can easily be enhanced by (the Sass functions included for use in*) your custom code.

## User benefits

Intended to be easy for non-technical people to understand:

- Layout system based on varying row widths and uniform child columns
- Includes a skew option for two column rows allows varying widths
- Easily produces common page layouts
- All layouts have predefined responsive behaviours

## Customisation

Uses Sass and includes many variables for custom grid generation, including:

- Number of horizontal grid units (default 18)
- Maximum number of uniform width columns per row (starting at 2)
- Media queries
- Responsive gutter widths and heights

## Technical rationale

These other goals were important when developing Jam:

- Use CSS Grid and Sass
- Include Sass mixins and functions* for project specific enhancements
- For simplicity, Jam classes should be applied to row divs only
- Allow non-column elements to span rows

## File size management

These steps have been taken to minimise file size:

- The Sass ouput contains as few @media blocks as possible
- No offset or padding methods unless you add them
- Skew option not nestable to prevent file size blowout
