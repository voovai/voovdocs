# CLAUDE.md - Guide for AI Coding Assistants

## Build/Development Commands
- `npm run dev` - Start local dev server at localhost:4321
- `npm run build` - Run type check and build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run astro ...` - Run CLI commands like `astro add`, `astro check`

## Code Style Guidelines
- **TypeScript**: Use strict type checking (extends "astro/tsconfigs/strict")
- **Imports**: Order imports by external, then internal, then relative
- **Components**: Follow Astro/Starlight conventions and docs
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Documentation**: Use JSDoc style comments for complex functions
- **Formatting**: 2-space indentation, semicolons, single quotes 
- **Error Handling**: Use try/catch with meaningful error messages
- **Content**: Keep documentation clear, concise and follow Markdown best practices

## Project Structure
- `src/content/docs/` - All documentation files (.md, .mdx)
- `src/assets/` - Images and other assets referenced in docs
- `public/` - Static assets (favicon, etc.)