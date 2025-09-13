# Testing

Next.js provides excellent support for testing with various testing frameworks. This guide covers setting up and using different testing tools with Next.js.

## Jest Setup

### Installation

Install Jest and related dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### Configuration

Create a `jest.config.js` file:

```js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

Create a setup file:

```js
// jest.setup.js
import '@testing-library/jest-dom'
```

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Testing Components

### Unit Testing

Test React components with React Testing Library:

```tsx
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Testing Hooks

Test custom hooks with React Hooks Testing Library:

```bash
npm install --save-dev @testing-library/react-hooks
```

```tsx
// __tests__/useCounter.test.ts
import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from '@/hooks/useCounter'

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(-1)
  })

  it('should reset counter', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.reset()
    })

    expect(result.current.count).toBe(0)
  })
})
```

### Testing API Routes

Test API routes in the Pages Router:

```js
// __tests__/api/hello.test.js
import { createMocks } from 'node-mocks-http'
import handler from '../../pages/api/hello'

describe('/api/hello', () => {
  it('should return Hello World', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Hello World',
    })
  })
})
```

## Cypress Setup

### Installation

Install Cypress and related dependencies:

```bash
npm install --save-dev cypress @testing-library/cypress
```

### Configuration

Create a `cypress.config.js` file:

```js
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
```

Add Cypress commands to `package.json`:

```json
{
  "scripts": {
    "cypress": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

### Writing Tests

Create a test file in `cypress/e2e`:

```js
// cypress/e2e/homepage.cy.js
describe('Homepage', () => {
  it('should display welcome message', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Next.js!')
  })

  it('should navigate to about page', () => {
    cy.visit('/')
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
    cy.contains('h1', 'About Page')
  })
})
```

### Custom Commands

Add custom commands in `cypress/support/commands.js`:

```js
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('button[type=submit]').click()
})
```

## Playwright Setup

### Installation

Install Playwright:

```bash
npm install --save-dev @playwright/test
```

### Configuration

Create a `playwright.config.js` file:

```js
// playwright.config.js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Writing Tests

Create a test file in `tests/`:

```js
// tests/homepage.spec.js
import { test, expect } from '@playwright/test'

test('should display welcome message', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome to Next.js!' })).toBeVisible()
})

test('should navigate to about page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/.*about/)
  await expect(page.getByRole('heading', { name: 'About Page' })).toBeVisible()
})
```

## Mocking

### Mocking Modules

Mock modules with Jest:

```js
// __tests__/Component.test.js
import { render, screen } from '@testing-library/react'

// Mock a module
jest.mock('@/lib/api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ name: 'John Doe' }),
}))

import { fetchUser } from '@/lib/api'
import Component from '@/components/Component'

describe('Component', () => {
  it('displays user name', async () => {
    render(<Component />)
    
    expect(await screen.findByText('John Doe')).toBeInTheDocument()
    expect(fetchUser).toHaveBeenCalled()
  })
})
```

### Mocking Next.js Router

Mock Next.js router for testing:

```js
// __tests__/Component.test.js
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

import Component from '@/components/Component'

describe('Component', () => {
  it('uses router query', () => {
    useRouter.mockReturnValue({
      query: { id: '123' },
      push: jest.fn(),
    })

    render(<Component />)
    
    expect(screen.getByText('ID: 123')).toBeInTheDocument()
  })
})
```

### Mocking Next.js Image

Mock Next.js Image component:

```js
// __mocks__/next/image.js
export default function Image({ src, alt, ...props }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...props} />
}
```

## Testing Utilities

### Test Data Factories

Create factories for test data:

```js
// __tests__/factories/user.js
export const createUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides,
})

export const createPost = (overrides = {}) => ({
  id: '1',
  title: 'Test Post',
  content: 'Test content',
  author: createUser(),
  ...overrides,
})
```

### Mock Providers

Create mock providers for testing:

```tsx
// __tests__/utils.tsx
import { ReactElement } from 'react'
import { SessionProvider } from 'next-auth/react'

export const TestProviders = ({ children }: { children: ReactElement }) => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'Test User' },
  }

  return (
    <SessionProvider session={mockSession}>
      {children}
    </SessionProvider>
  )
}
```

## Continuous Integration

### GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run E2E tests
        run: npm run cypress:run
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test

test:
  stage: test
  image: node:18
  before_script:
    - npm ci
  script:
    - npm test
    - npm run cypress:run
```

## Performance Testing

### Lighthouse CI

Set up Lighthouse CI for performance testing:

```bash
npm install --save-dev @lhci/cli
```

Create `lighthouserc.js`:

```js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run start',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

## Coverage

### Jest Coverage

Enable coverage in Jest:

```js
// jest.config.js
module.exports = {
  // ... other config
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## Debugging Tests

### Debugging with VS Code

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--detectOpenHandles"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ]
}
```

## Best Practices

### Test Structure

Follow the AAA pattern (Arrange, Act, Assert):

```js
describe('Counter', () => {
  it('should increment value when clicked', () => {
    // Arrange
    render(<Counter />)
    const button = screen.getByRole('button', { name: 'Increment' })
    
    // Act
    fireEvent.click(button)
    
    // Assert
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
```

### Test Isolation

Ensure tests are isolated:

```js
beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  cleanup()
})
```

### Descriptive Test Names

Use descriptive test names:

```js
// Good
it('should display error message when email is invalid', () => { ... })

// Bad
it('should work', () => { ... })
```

### Avoid Implementation Details

Test behavior, not implementation:

```js
// Good - tests user behavior
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()

// Bad - tests implementation details
expect(container.querySelector('.btn-submit')).toBeInTheDocument()
```

## Troubleshooting

### Common Issues

1. **Window is not defined**:
   Use `jest-environment-jsdom` or mock window object

2. **Module not found**:
   Check path aliases in Jest config

3. **Async tests not waiting**:
   Use `async/await` or `act()` for React updates

4. **Mock not working**:
   Ensure mocks are set up before imports

### Performance Tips

1. Use `--watch` for development
2. Run only relevant tests with `--testNamePattern`
3. Use `--coverage` to identify untested code
4. Parallelize tests when possible

### Migration Tips

1. Start with simple unit tests
2. Add integration tests gradually
3. Set up CI/CD early
4. Monitor test coverage