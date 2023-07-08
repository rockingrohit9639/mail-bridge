# 🚀 Full Stack Starter Template

The Full Stack Starter Template is a comprehensive template for building full stack projects. It provides a solid foundation with a ReactJS frontend, NestJS backend, built-in JWT authentication, and Prisma as the ORM. This project is organized as a monorepo using Turborepo, resulting in faster build processes. Additionally, it includes Hygen templates for easy and efficient scaffolding.

## Features

✨ **Full Stack Ready**: Out-of-the-box setup for developing full stack applications.

⚛️ **ReactJS Frontend**: A modern and powerful frontend framework for building interactive user interfaces.

🚀 **NestJS Backend**: A progressive Node.js framework for building efficient and scalable server-side applications.

🔒 **JWT Authentication**: Built-in authentication system using JSON Web Tokens (JWT) for secure user management.

🗃️ **Prisma ORM**: A type-safe database toolkit that simplifies database access and manipulation.

🔧 **Turborepo**: A monorepo management tool that optimizes the build process for faster development.

🔨 **Hygen Templates**: Scaffolding templates powered by Hygen for rapid and consistent code generation.

## Scaffolding Commands

### Pages

**Scaffold Page**: `npx hygen page new`

| Field  | Description                               |
| ------ | ----------------------------------------- |
| name   | Name of the page (in kebab-case).         |

**Scaffold Sub-component**: `npx hygen page sub-component`

| Field  | Description                               |
| ------ | ----------------------------------------- |
| name   | Name of the component.                     |
| parent | Name of the page where this sub-component is to be created. |

**Scaffold Hook**: `npx hygen page hook`

| Field  | Description                               |
| ------ | ----------------------------------------- |
| name   | Name of the hook (without the 'use' prefix). |
| parent | Name of the page where this hook is to be created. |

### Components

**Scaffold Component**: `npx hygen component new`

| Field  | Description                               |
| ------ | ----------------------------------------- |
| name   | Name of the component (in kebab-case).    |

**Scaffold Sub-component**: `npx hygen component sub-component`

| Field  | Description                               |
| ------ | ----------------------------------------- |
| name   | Name of the component.                     |
| parent | Name of the component where this sub-component is to be created. |

### Hooks

**Scaffold Hook**: `npx hygen hook new`

| Field  | Description                               |
| ------ | ----------------------------------------- |
| name   | Name of the hook (without the 'use' prefix). |



## Usage

1. Clone the repository: `git clone https://github.com/rockingrohit9639/full-stack-starter-template.git`
2. Install dependencies:
```
pnpm install    
```

4. Customize the project according to your requirements.
5. Start the development servers:
```
pnpm run dev
```

🌟 Feel free to contribute, raise issues, and submit pull requests to help improve this starter template!

## License

This project is licensed under the [MIT License](LICENSE).
