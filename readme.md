# TypeScript Server Boilerplate

A lightweight boilerplate for creating a TypeScript-based server. This template provides a solid foundation for building RESTful APIs or microservices using TypeScript and Node.js.

## Features

- **TypeScript Support**: Full TypeScript support for better type safety and development experience.
- **Express.js**: Built-in support for Express.js to create robust APIs.
- **ESLint**: Configured ESLint for code quality and consistency.
- **Environment Variables**: Easy management of environment variables using `dotenv`.
- **Sample Routes**: Example routes to help you get started quickly.

## Getting Started

##### To Use Without Install

```
npx server-ts-init <project name>
```

##### For install package globly

```
npm install -g server-ts-init
```

```
//Write command when you install globly
server-ts-init <project>

```

##### Chack the tool is install successfully

```
server-ts-init -hi
//in return get some text, that mean the tool is install successfully install
```

### Folder Stucture

```
<Project name>/
  ├── src/
  │   ├── controllers/     # Route controllers
  │   ├── routes/          # API routes
  │   ├── middlewares/     # Custom middlewares
  │   ├── models/          # Data models
  │   ├── config/          # Configuration files
  │   └── index.ts         # Entry point
  │
  ├── .env                 # Environment variables
  ├── .eslintrc.js         # ESLint configuration
  ├── .prettierrc          # Prettier configuration
  ├── package.json         # Project metadata and dependencies
  └── tsconfig.json        # TypeScript configuration
```

### Prerequests

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository or download the boilerplate:

   ```bash
   git clone https://github.com/arbab-killer/server-ts-cli
   ```
