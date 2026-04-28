# Agents Guide

This document describes how AI agents should work with this codebase, including changelog management and prototype updates.

## About This Codebase

**This is a collaborative codebase where multiple people are actively tinkering and making changes.**

- Multiple team members contribute code, features, and improvements
- Changes may come from different people working on different parts of the system
- Always check git history and recent commits to understand context before making changes
- Be respectful of existing patterns and code style established by other contributors
- When making changes, consider how they might affect other team members' work
- Communication and documentation are key - update changelogs and comments to help others understand your changes

## Main Project Changelog

**CRITICAL REMINDER**: The main `CHANGELOG.md` file at the project root MUST be updated for EVERY change that is committed and pushed to the repository.

- **Always update CHANGELOG.md** before or immediately after making changes
- Review git log to ensure all commits are documented in the changelog
- Use the format: `## [YYYY-MM-DD]` for dated entries, `## [Unreleased]` for work in progress
- Categorize changes as: Added, Changed, Fixed, Removed, or Technical
- Be specific and descriptive - focus on user-visible changes and technical improvements
- When in doubt, add an entry - it's better to have too much documentation than too little

## Reference Documentation

All detailed documentation for agents is located in the [`agents-and-instructions/`](./agents-and-instructions/) directory. Here's what each file contains and when to use it:

### [`philosophy_and_taste.md`](./agents-and-instructions/philosophy_and_taste.md)
**When to use**: Before making any architectural decisions or when choosing between implementation approaches.

**What it covers**: Core principles that guide how we build - scrappy over over-architected, done is the engine of more, practical over perfect. Use this to understand the team's decision-making framework and avoid over-engineering.

### [`end_state.md`](./agents-and-instructions/end_state.md)
**When to use**: When planning features or understanding the long-term vision. Reference this to see where we're heading, but remember it's a north star, not a sprint goal.

**What it covers**: Complete vision of what the system looks like when fully realized - automated tracking, rich profiles, advanced analytics, etc. Use this to anchor decisions in the long-term direction, but don't let it block shipping useful things now.

### [`development-workflow.md`](./agents-and-instructions/development-workflow.md)
**When to use**: When setting up your environment, understanding the development process, or figuring out how to contribute.

**What it covers**: Development setup, workflow processes, how to run the app, testing procedures, and contribution guidelines.

### [`style-guide.md`](./agents-and-instructions/style-guide.md)
**When to use**: When writing code, creating components, or making styling decisions.

**What it covers**: Code style conventions, component patterns, naming conventions, and design system usage. Follow this to maintain consistency across the codebase.

### [`build-optimization.md`](./agents-and-instructions/build-optimization.md)
**When to use**: When working with prototype builds, optimizing build times, or troubleshooting build issues.

**What it covers**: Prototype build optimization strategies, caching mechanisms, performance metrics, and troubleshooting guide. Essential reading if you're modifying the build process or adding new prototypes.

### [`showcase-implementation.md`](./agents-and-instructions/showcase-implementation.md)
**When to use**: When working on the showcase/prototype playground features or understanding how showcases work.

**What it covers**: Implementation details of the showcase system, data model, API endpoints, and component architecture.

## Prototype Changelogs

Each prototype has a `CHANGELOG.md` file in its directory that tracks changes, features, and updates. The changelog system is designed to help teams understand what each prototype does, what makes it unique, and how it evolves over time.

### Changelog Structure

Each changelog follows this structure:

```markdown
# Changelog - [Prototype Name]

## About

- **Designer**: [Name]
- **Tool**: [Tool used]
- **Created**: [Date]
- **Status**: [Active/Deprecated/etc]
- **AI Generated**: Yes/No

[Brief description of the prototype]

---

## [Version/Date] - YYYY-MM-DD

### Added
- Feature 1
- Feature 2

### Changed
- Change 1
- Change 2

### Fixed
- Fix 1
- Fix 2

### Unique Features
- Feature that only this prototype has

### Shared Features
- Feature that multiple prototypes share

### Notes
[Additional context or observations]
```

### When to Update Prototype Changelogs

Agents should update prototype changelogs when:

1. **New Features Added**: When a prototype gains new functionality
2. **Bug Fixes**: When issues are resolved
3. **Refactoring**: When significant code changes are made
4. **Dependencies Updated**: When major dependency changes occur
5. **Status Changes**: When a prototype is deprecated, archived, or reactivated
6. **Documentation Updates**: When the About section needs updating

### Update Process

1. **Identify the Prototype**: Use the slug from `src/data/prototypes.json`
2. **Read the Current Changelog**: Path is `design-prototypes/[folderName]/CHANGELOG.md` or use `prototype.changelogPath`
3. **Add New Entry**: Add a new section at the top with categorized changes
4. **Update Prototype Data**: If new unique features are added, update `src/data/prototypes.json`

### Best Practices

1. **Be Specific**: Instead of "Improved UI", say "Improved button hover states and spacing"
2. **Link Issues**: Reference issue numbers or PRs when applicable
3. **User Impact**: Focus on what users/developers will notice
4. **Technical Details**: Include technical details in Notes if relevant
5. **Date Format**: Use YYYY-MM-DD format consistently
6. **Versioning**: Use semantic versioning (v1.0.0) or dates, be consistent

## Questions?

If unsure about whether to update a changelog:
- **When in doubt, update it**: It's better to have too much documentation than too little
- **Small changes matter**: Even minor fixes can be worth documenting
- **User-facing changes**: Always document user-visible changes
- **Breaking changes**: Always document breaking changes prominently
