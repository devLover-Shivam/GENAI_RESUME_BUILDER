# GenAI Resume Builder

A full-stack interview preparation application. A signed-in user can provide a resume PDF, a short self-description, and a job description; the backend extracts resume text, asks Google Gemini to prepare a structured report, and persists the result in MongoDB.

## Documentation

- [System architecture and project guide](docs/ARCHITECTURE.md): component map, Mermaid diagrams and flows, data model, API reference, setup, configuration, and current implementation notes.

## Repository layout

```text
BACKEND/   Express API, authentication, PDF parsing, Gemini integration, Mongoose models
FRONTEND/  React/Vite application, routes, authentication state, interview input page
docs/      Architecture and implementation documentation
```

## Status at a glance

Authentication routes and the protected interview-report API are implemented. The home screen currently presents the three interview inputs, but does not yet submit them or render a generated report. See the architecture guide for full behavior and known implementation caveats.
