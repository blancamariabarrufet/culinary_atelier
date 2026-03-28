# Design System: Modern Classic Culinary

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Curated Atelier."** 

This design system moves away from the sterile, high-frequency layout of typical recipe sites. Instead, it treats every recipe as a piece of heritage and every ingredient as a curated artifact. We achieve a "Modern Classic" aesthetic by balancing the rigid authority of traditional editorial typography with the "cozy" warmth of organic tones. 

To break the "template" look, designers must embrace **intentional asymmetry**. Hero sections should feature overlapping elements—such as a high-resolution food photograph bleeding off-grid, partially layered over a `surface-container-high` card. This creates a tactile, scrapbook-like depth that feels premium and bespoke rather than mass-produced.

---

## 2. Colors & Tonal Architecture
The palette is a study in warmth. We avoid pure whites and harsh blacks, opting instead for a range of creams (`#fcf9f4`) and sophisticated dusty roses (`#745454`).

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To separate a recipe's "Ingredients" from its "Instructions," do not draw a line. Instead, shift the background color. Use a `surface` background for the main layout and a `surface-container-low` (`#f6f3ee`) block for the sidebar. The transition of tone is the boundary.

### Surface Hierarchy & Nesting
Think of the UI as layers of fine parchment. 
- **Base Level:** `surface` (#fcf9f4)
- **Secondary Level:** `surface-container` (#f0ede8)
- **Interactive/Elevated Level:** `surface-container-lowest` (#ffffff)
By nesting a `surface-container-lowest` card inside a `surface-container-high` section, you create natural focus without a single pixel of stroke.

### The "Glass & Gradient" Rule
For floating navigation or "Quick View" recipe cards, use **Glassmorphism**. Apply `surface` at 80% opacity with a `20px` backdrop-blur. 
**Signature Texture:** Main CTAs should not be flat. Apply a subtle linear gradient from `primary` (#745454) to `primary_container` (#8e6c6c) at a 135-degree angle to give buttons a "velvet" tactile quality.

---

## 3. Typography: The Editorial Voice
We use typography to bridge the gap between "Serious Tradition" and "Modern Clarity."

*   **Display & Headlines (Noto Serif):** These are your "Authoritative" voices. Use `display-lg` for recipe titles. The serif nature conveys a sense of culinary history and "tried-and-true" reliability.
*   **Body & Labels (Work Sans):** Use Work Sans for all functional text. It is clean, legible at small sizes (perfect for ingredient lists), and provides a modern counterweight to the traditional serif.

**Hierarchy Tip:** For a premium editorial feel, increase the tracking (letter-spacing) on `label-md` by 5% and use all-caps for category tags (e.g., "APPETIZERS" or "20 MIN PREP").

---

## 4. Elevation & Depth
Depth in this system is organic, not synthetic. 

*   **The Layering Principle:** Avoid shadows where possible. Use the `surface-container` scale to create "steps." A recipe step card (`surface-container-highest`) sitting on a recipe background (`surface-container-low`) creates all the separation needed.
*   **Ambient Shadows:** If an element must float (like a "Save Recipe" FAB), use a custom shadow: `0px 12px 32px rgba(118, 86, 86, 0.08)`. The use of the `surface_tint` color in the shadow ensures it feels like a soft glow rather than a grey smudge.
*   **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., input fields), use `outline_variant` (#d4c2c2) at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient (`primary` to `primary_container`), `md` (0.75rem) roundedness. Text: `label-md` in `on_primary`.
- **Secondary:** `surface-container-highest` background with `primary` text. No border.
- **Tertiary:** Ghost style. `primary` text with no background.

### Cards & Lists
- **The Rule of Whitespace:** Forbid divider lines between list items (e.g., ingredients). Use `spacing-4` (1.4rem) to separate items.
- **Recipe Cards:** Use `md` (0.75rem) rounded corners. The image should have a subtle inner-glow to soften the transition to the card body.

### Input Fields
- **Styling:** Use `surface-container-low` as the background. 
- **Focus State:** Transition the background to `surface-container-lowest` and add a 1px "Ghost Border" using `primary` at 30% opacity.

### Navigation (The "Global Header")
- Avoid a solid bar. Use a centered, floating `surface` container with `full` (pill-shaped) roundedness and a `surface-container-low` backdrop blur.

---

## 6. Do’s and Don’ts

### Do:
- **Use Wide Gutters:** Use `spacing-10` (3.5rem) or higher for page margins to give the content a "luxury of space."
- **Embrace Warmth:** Ensure all imagery is color-graded to match the `background` (#fcf9f4) warmth. Cool-toned or "blue" photos will break the immersion.
- **Soft Geometry:** Use the `lg` (1rem) roundedness for large containers (like recipe headers) to reinforce the "cozy" feel.

### Don't:
- **Don't use 100% Black:** Never use `#000000`. Use `on_surface` (#1c1c19) for all text to maintain the soft, printed-paper look.
- **Don't use hard shadows:** If a shadow looks like a shadow, it’s too dark. It should look like a natural occlusion of light.
- **Don't overcrowd:** If a screen feels "busy," increase the `spacing` tokens between sections rather than adding lines or boxes.