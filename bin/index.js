#! /usr/bin/env node

import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

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
  rootFiles: [".env", "package.json", "tsconfig.json"],
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
const createProjectStructure = (projectName) => {
  const rootPath = path.join(process.cwd(), projectName);

  // Create root directory
  createDirectory(rootPath);

  // Create src directory and its subdirectories
  const srcPath = path.join(rootPath, "src");
  createDirectory(srcPath);

  projectStructure.src.forEach((item) => {
    const itemPath = path.join(srcPath, item);

    if (item.includes(".ts")) {
      // Create index.ts file with a basic content
      createFile(
        itemPath,
        `import express, {Request, Response, Application } from "express";
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
  createFile(path.join(rootPath, ".env"), "PORT=3000\n NODE_ENV=development");
  createFile(
    path.join(rootPath, "package.json"),
    JSON.stringify(
      {
        name: projectName,
        version: "1.1.4",
        description: "",
        main: "index.js",
        scripts: {
          start: "tsc && node dist/index.js",
          build: "tsc",
          dev: "nodemon src/index.ts",
        },
        keywords: [],
        author: "",
        license: "ISC",
        dependencies: {
          dotenv: "^16.4.5",
          express: "^4.21.1",
        },
        devDependencies: {
          "@types/express": "^5.0.0",
          "@types/node": "^22.8.2",
          "ts-node": "^10.9.2",
          typescript: "^5.6.3",
        },
      },
      null,
      2
    )
  );

  createFile(
    path.join(rootPath, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "es6",
          module: "commonjs",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
        },
        include: ["src/**/*.ts"],
        exclude: ["node_modules"],
      },
      null,
      2
    )
  );
  console.log(
    `Project  structure has been created successfully! Server is running 👇👇👇👇👇👇`
  );
  console.log("install package ........");
  exec(`cd ${rootPath} && npm install  `, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log(
        "Install dependencies successfully\nRun the command To start the Server\n cd " +
          projectName +
          "\n'npm run dev' "
      );
    }
  });
};

// Get the project name from the command line arguments
const projectName = process.argv[2];

if (projectName) {
  createProjectStructure(projectName);
} else {
  console.error(
    "Please specify a project name. Usage: arbab create-server.ts <project-name>"
  );
}
