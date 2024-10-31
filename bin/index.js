#! /usr/bin/env node

import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import ora from "ora";

const projectStructure = {
  src: [
    "controllers",
    "services",
    "libs",
    "types",
    "routes",
    "middlewares",
    "models",
    "config",
    "index.ts", // The entry point
  ],
  rootFiles: [
    { ".env": `PORT = 3000\nNODE_ENV = development` },
    {
      "package.json": `
{
  "name": "ts-server",
  "version": "1.1.4",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc && node dist/index.js",
    "build": "tsc",
    "dev": "nodemon src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.21.1"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "nodemon": "^3.1.7",
    "@types/node": "^22.8.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}
          `,
    },
    {
      "tsconfig.json": `
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"],
}
        `,
    },
    { ".gitignore": `node_modules\n.env` },
  ],
};

// Helper function to create a directory if it doesn't exist
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Helper function to create a file with default content
const createFile = (filePath, content = "") => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
};

// Main function to create project structure
const spinner = ora("Creating project structure...\n").start();
const createProjectStructure = (projectName) => {
  const rootPath = path.join(process.cwd(), projectName); //path = c:desktop/projectName
  // Create root directory
  createDirectory(rootPath);
  // Create src directory and its subdirectories
  const srcPath = path.join(rootPath, "src");
  createDirectory(srcPath);
  // Create server.ts file in src  directory a
  projectStructure.src.forEach((item) => {
    const itemPath = path.join(srcPath, item);
    if (item.includes(".ts")) {
      // Create index.ts file with a basic content
      createFile(
        itemPath,
        `
import express, {Request, Response, Application } from "express";

import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req:Request, res:Response) => {

  res.send("Hello World!");

})

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

`
      );
    } else {
      // Create subdirectory in src
      createDirectory(itemPath);
    }
  });

  // Create root-level files with basic content
  projectStructure.rootFiles.forEach((item) => {
    for (const [key, value] of Object.entries(item)) {
      createFile(path.join(rootPath, key), value);
    }
  });

  spinner.succeed(
    "Project  structure has been created successfully! Server is running 👇👇👇👇👇👇"
  );

  const installSpinner = ora(
    "Installing dependencies...and packages..."
  ).start();

  exec(
    `cd ${rootPath} && npm install  && git init && git add . && git commit -m "initial commit"`,

    (error, stdout, stderr) => {
      console.log("initial git repository ................");

      if (error) {
        console.log(`error: ${error.message}`);

        installSpinner.fail("Failed to install dependencies.");

        return;
      } else {
        installSpinner.succeed("Dependencies installed successfully.");

        console.log(
          "Run the command To start the Server\n cd " +
            projectName +
            projectName +
            "\n'npm run dev' "
        );
      }
    }
  );
};

// Get the project name from the command line arguments
const args = process.argv.slice(2);
const firstArg = args[0];
if (firstArg === "--hi") {
  spinner.succeed("server-ts-init is installed successfully\n");
  console.log(
    "I am The CLI tool for to create a typescript server using nodejs 👌\n\ni am developed by Arbab for to meke development essay and efficient😀"
  );
} else if (firstArg) {
  createProjectStructure(firstArg);
} else {
  spinner.fail(
    "Please specify a project name. Usage: arbab create-server.ts <project-name>"
  );
}
