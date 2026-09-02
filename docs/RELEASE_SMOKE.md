# Production Release Smoke

Use this checklist against the deployed GitHub Pages site after a successful production workflow.

## Homepage

- [ ] Page loads without an error document or redirect loop.
- [ ] Hero title and both hero actions render.
- [ ] Primary navigation reaches Home, Featured Dev, Blog, Design Studio, and GitHub.
- [ ] Mobile navigation opens, closes, reports the correct expanded state, and closes after choosing a link.
- [ ] Back to Top appears after scrolling and returns to the document top.

## Featured Dev

- [ ] All Projects shows all six project cards.
- [ ] WordPress, Code Snippets, and Video filters show only their matching projects.
- [ ] Grid layout closes gaps after each filter change.
- [ ] Each project dialog opens from keyboard and pointer input.
- [ ] Escape, close controls, and overlay dismissal close dialogs.
- [ ] Keyboard focus remains inside an open dialog and returns to the originating card after close.

## Blog

- [ ] All published article links resolve.
- [ ] Article heading and publication date render correctly.
- [ ] Article media fits narrow viewports without horizontal overflow.
- [ ] The archived self-marketing article displays its archive note and no raw plugin shortcode text.

## Feeds and metadata

- [ ] `/feed.xml` resolves and contains canonical HTTPS item links.
- [ ] `/sitemap.xml` resolves.
- [ ] Document metadata advertises the RSS feed.

## Browser and accessibility spot-check

- [ ] Keyboard focus is visibly apparent on navigation, filters, project cards, modal controls, and Back to Top.
- [ ] Reduced-motion preference does not trigger unnecessary animated transitions.
- [ ] No mixed-content warnings, missing local assets, or obvious console errors appear.

## Release decision

Do not call a release healthy solely because GitHub Actions is green. Record or fix any live-surface failure before the next production change.
