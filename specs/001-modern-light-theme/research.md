# Research & Decisions for Modern Light Theme

This document outlines the research and decisions made to resolve the clarifications needed for the implementation of the modern light theme.

## 1. Theme Modification Strategy

*   **Decision**: The existing `hextra` theme's styles will be overridden using the project's own SASS files (`assets/sass/_custom.sass` and `assets/sass/_variables.sass`).
*   **Rationale**:
    *   The `hextra` theme is imported as a Hugo module, which makes direct modification difficult and not recommended.
    *   Overriding the theme is a clean and maintainable approach that keeps all customizations within the project's codebase.
    *   It avoids the need to fork and maintain a separate version of the theme, which would add unnecessary complexity.
*   **Alternatives considered**:
    *   **Forking the theme**: This was rejected as it would add maintenance overhead.
    *   **Creating a new theme**: This was rejected as it's a significant amount of work and the existing theme provides a good foundation.

## 2. Design System / Component Library

*   **Decision**: A simple style guide will be established within the project's documentation. It will define the color palette, typography, and spacing for the new theme.
*   **Rationale**:
    *   There is no existing design system in place.
    *   Establishing a simple style guide will ensure consistency and provide a foundation for future UI development.
    *   It's a lightweight approach that avoids the complexity of integrating a full-blown CSS framework.
*   **Alternatives considered**:
    *   **Using a CSS framework (e.g., Bootstrap, Tailwind CSS)**: This was rejected to avoid introducing a large new dependency and to maintain a lightweight final product.
    *   **No design system**: This was rejected as it could lead to an inconsistent and less maintainable theme.

## 3. Browser Support

*   **Decision**: The new theme will officially support the last two major versions of the following browsers:
    *   Google Chrome
    *   Mozilla Firefox
    *   Apple Safari
    *   Microsoft Edge
*   **Rationale**:
    *   This policy aligns with current industry best practices for 2025.
    *   It ensures a good user experience for the vast majority of users while keeping the testing matrix manageable.
    *   It encourages users to stay on up-to-date and secure browser versions.
*   **Alternatives considered**:
    *   **Supporting older browsers**: This was rejected as it would increase development and testing time and could hold back the use of modern CSS features.
