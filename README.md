
# Biskop Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Monorepo for Biskop applications built with Nx ✨

## Projects

- **biskop-web**: Angular web application
- **biskop-mobile**: Ionic mobile application

## Quick Start

### Prerequisites
- Node.js v16+
- npm/yarn/pnpm
- Nx CLI (`npm install -g nx`)

```sh
git clone [your-repo-url]
cd biskop-monorepo
npm install
```

## Development Commands

### Angular App
```sh
# Serve
nx serve biskop-web

# Build
nx build biskop-web

# Test
nx test biskop-web
```

### Ionic App
```sh
# Serve
nx serve biskop-mobile

# Build
nx build biskop-mobile

# Test
nx test biskop-mobile
```

## Project Structure
```
apps/
  biskop-web/       # Angular app
  biskop-mobile/    # Ionic app
libs/               # Shared code
  shared/           # Common libraries
```

## Creating New Projects
```sh
# New Angular app
nx g @nx/angular:app my-new-web-app

# New Ionic app
nx g @nx/ionic:app my-new-mobile-app

# New shared library
nx g @nx/workspace:lib shared/my-lib
```

## CI/CD
Uses Nx Cloud for caching:
```sh
nx connect-to-nx-cloud
```

## Utilities
```sh
# View project graph
nx graph

# Run all tests
nx run-many --target=test --all

# Lint all projects
nx run-many --target=lint --all
```

## Documentation
- [Nx](https://nx.dev)
- [Angular](https://angular.io/docs)
- [Ionic](https://ionicframework.com/docs)
```

