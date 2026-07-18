# Bug Tracking System - Playwright Automation 

## Overview

This repository contains an end-to-end (E2E) automation framework developed using **Playwright** and **JavaScript** for validating the functionality, reliability, and user workflows of the Bug Tracking System.


---

## Technology Stack

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| Playwright     | End-to-end browser automation    |
| JavaScript     | Programming language             |
| Node.js        | Runtime environment              |
| npm            | Package management               |
| Git            | Version control                  |
| GitHub Actions | Continuous Integration           |

---

## Project Objectives

The main objectives of this automation framework are:

* Automate critical user journeys of the Bug Tracking System
* Reduce manual regression testing effort
* Improve test execution consistency and reliability
* Identify defects earlier in the development lifecycle
* Enable continuous quality validation through CI/CD integration

---

## Framework Structure

```
bug-tracking-system-playwright
│
├── tests                 # Test specifications
│
├── pages                 # Page Object Model classes
│
├── fixtures              # Custom Playwright fixtures
│
├── test-data             # Test data files
│
├── utils                 # Utility/helper functions
│
├── playwright.config.js  # Playwright configuration
│
├── package.json          # Project dependencies
│
└── README.md             # Project documentation
```

---

## Prerequisites

Ensure the following tools are installed:

* Node.js (LTS version recommended)
* npm
* Git
* Visual Studio Code

Verify installations:

```bash
node -v
npm -v
git --version
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd bug-tracking-system-playwright
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Configuration

Update the application URL in:

```
playwright.config.js
```

Example:

```javascript
use: {
  baseURL: 'http://localhost:3000',
}
```

Ensure the Bug Tracking System application is running locally before executing tests.

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.js
```

### Run tests with UI mode

```bash
npx playwright test --ui
```

---

## Test Reports

Generate and view the HTML report:

```bash
npx playwright show-report
```

The framework uses Playwright's built-in reporting capabilities to provide:

* Test execution summary
* Failed test details
* Screenshots
* Trace information
