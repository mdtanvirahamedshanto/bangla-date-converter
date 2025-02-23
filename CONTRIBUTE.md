# Contributing to Bangla Date Converter

Thank you for your interest in contributing to Bangla Date Converter! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/mdtanvirahamedshanto/bangla-date-converter.git
   cd bangla-date-converter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Coding Standards

### TypeScript Guidelines

- Write code in TypeScript
- Maintain strict type safety
- Use interfaces for complex object types
- Document public APIs with JSDoc comments
- Follow the existing code style

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Keep functions focused and concise
- Add comments for complex logic
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces

## Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting PR:
  ```bash
  npm test
  ```
- Maintain test coverage
- Include both unit and integration tests when applicable

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure your code follows the style guidelines
4. Update the README.md if necessary
5. Submit a PR with a clear title and description
6. Reference any related issues

### PR Title Format

Use one of these prefixes:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test updates
- `refactor:` for code refactoring

## Commit Messages

- Use clear and descriptive commit messages
- Follow conventional commits format
- Reference issues when applicable

Example:
```
feat: add support for relative time formatting

Implements relative time formatting feature with both Bengali and English output.
Closes #123
```

## Questions or Problems?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Bangla Date Converter better! 🙏