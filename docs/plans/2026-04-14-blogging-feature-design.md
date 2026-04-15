# Design: Blogging Feature — "Elite Posts"

## Objective
Introduce a high-fidelity, optional blogging system to TheProFile that allows developers to publish content without compromising the core single-page portfolio philosophy or performance.

## Architecture

### 1. Conditional Integration
The blog system follows a "Zero-Config" approach for developers:
- **Nav Trigger**: The `nav.html` will check `site.posts.size > 0`. If true, a "Blog" link is automatically injected into the navigation bar.
- **Isolated Routing**: All blog-related content resides under the `/blog/` subdirectory.

### 2. Layouts & Templates
- **Blog Index (`/blog/index.html`)**: Uses a **Bento Grid** layout similar to the technical stack section. Each card displays the post title, date, and a short excerpt.
- **Post Layout (`_layouts/post.html`)**: A clean, centered typography-focused layout. It includes:
    - Centered glassmorphism content container.
    - Post metadata header (Date, Reading Time estimate).
    - Support for high-fidelity Markdown (syntax highlighting, blockquotes, images).
    - "Back to Home" and "Back to Blog" navigation.

### 3. Styling (Isolated Assets)
- Blog-specific styles will be housed in `assets/css/main.scss` under a dedicated blog section or imported via a modular SCSS structure to prevent bloat on the home page.
- **Interaction Standards**: Blog cards will share the synchronized hover vibrancy and glow effects of the main portfolio.

## Data Flow
1. **User Action**: Developer creates a `.md` file in `_posts/`.
2. **Jekyll Build**: Jekyll detects posts and populates `site.posts`.
3. **Template Logic**: 
    - `nav.html` detects `site.posts` and renders the "Blog" button.
    - `/blog/index.html` loops through `site.posts` to build the bento grid.

## Success Criteria
- [ ] No performance regression on the home page.
- [ ] Blog layout matches the "Elite" Glassmorphism aesthetic.
- [ ] Posts render perfectly with and without Vanta background effects.
- [ ] Navigation between Home and Blog is seamless (retains theme state).

## Next Step
Proceed to `implementation_plan.md` for the technical task breakdown.
