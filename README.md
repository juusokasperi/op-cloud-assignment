# IaC / Cloud Assignment (OP Kiitorata Quantitative Developer)
This project consists a simple full-stack web application in TypeScript (React frontend, Fastify/node.js backend) deployed entirely on AWS using the AWS CDK.

- **100% Infrastructure as Code**: All AWS resources are defined in TS using the AWS CDK.
- **Full-Stack Serverless**: Architecture is fully serverless. It uses S3, CloudFront, Lambda and API Gateway.
- **Containerized Backend**: The backend is containerized using Docker and runs as a Lambda function.
- **One-line Deployment**: A single `npm run deploy` command builds the frontend, installs all dependencies, tests the infrastructure, builds the backend Docker image, and deploys the entire stack.
- **Dynamic API configuration**: The CDK stack automatically injects the API Gateway's URL into a `config.json` file deployed with the frontend. The React app reads this config at runtime, so no manual configuration is needed.
- **Automated Security**: The backend's CORS policy is automatically configured at deployment. CDK passes CloudFront URL to the Lambda function as an environment variable, which the Fastify app uses to only allow requests from the deployed frontend.

## Prerequisites
To build and deploy this program you will need;
1. **Node.js** and **npm**
2. **AWS account** (Free Tier is sufficient)
3. **AWS CLI** installed.
	- Needs to be **configured** with your credentials by running: `aws configure`
- **AWS CDK Toolkit** installed.
```
npm install -g aws-cdk
```
- **Docker**: Installed and running

## Usage (Build, Deploy and Destroy)
This project uses a single `package.json` at the root to orchestrate all actions.

### 1. Build & Deploy
This single command will install all dependencies, build the frontend, test the infrastructure and deploy the entire stack to your AWS account using CDK. During deployment, CDK automatically builds the backend Docker image and will prompt you to approve the creation of IAM roles. You will need to type `y` to approve these changes. This step will take a couple minutes - after the application has been deployed, the terminal will display the URL outputs.
```
npm run deploy
```

### 2. Destroy
To tear down all AWS resources (and avoid further charges)
```
npm run destroy
```

### 3. Run tests
To run the infrastructure unit tests locally:
```
npm run test:infra
```
In case of the test pointing out about changes, review them and run `npm run test:infra:update` to update the snapshot.


## About the implementation

### Backend
- **Stack**: TypeScript, Node.js, Fastify.
- **Data**: Serves projects from a single `/api/projects` endpoint.
- **CORS**: Configured with `@fastify/cors` to dynamically read the `FRONTEND_URL` environment variable (provided by CDK) and only allows requests from that origin.
### Frontend
- **Stack**: TypeScript and React (built with Vite).
- **Styling**: Styled Components.
- **Data**: Fetches API url from `/config.json` at runtime, uses that URL to fetch and display the projects at runtime.
### AWS Infrastructure
- **Frontend**: The static React build is hosted in a **private S3 bucket**.
- **CDN**: A **CloudFront distribution** serves the S3 content, providing HTTPS and fast global access.
- **Backend**: The Dockerized Fastify app is deployed as a **Lambda Function** using a Docker container image.
- **API**: An **API Gateway (REST API)** with a `/{proxy+}` route points all requests to the Lambda function.

## Non-idealities and Future Improvements
- **API Security**: Gateway is public and unauthenticated. I would add rate limiting or a request authorizer to protect the API.
- **Local Dev**: If `config.json` is not provided for the frontend, a hardcoded value `http://localhost:3000` is used. For the backend, if `PORT` and `FRONTEND_URL` values are not passed on as environmental variables, hardcoded values `3000` and `http://localhost:5173` are used.
- **Database**: The backend serves an array from a static TypeScript file. The next logical step would be to replace that with f.ex. **Amazon DynamoDB**, which would be defined in the CDK stack.
- **CI/CD Pipeline**: The **npm run deploy** is designed to work for local execution. In production, I would like to integrate this into a CI/CD pipeline (e.g., Github Actions) that runs tests and deploys the changes automatically on every push to the main branch.

### Project Source Structure
```sh
.
├── README.md
├── backend
│   ├── Dockerfile
│   ├── data
│   │   └── projects.ts
│   ├── index.ts
│   ├── package.json
│   ├── routes
│   │   └── projects.ts
│   ├── schemas
│   │   └── projects.ts
│   ├── tsconfig.json
│   └── utils
│       └── config.ts
├── docs
│   └── Quant_Cloud_Assignment.pdf
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   └── imgs
│   ├── src
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── components
│   │   │   ├── DropDown
│   │   │   ├── Header
│   │   │   └── ProjectCard
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── styled.d.ts
│   │   ├── styled.ts
│   │   ├── theme.ts
│   │   ├── types.ts
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── infrastructure
│   ├── README.md
│   ├── bin
│   │   └── infrastructure.ts
│   ├── cdk.json
│   ├── jest.config.js
│   ├── lib
│   │   └── infrastructure-stack.ts
│   ├── package.json
│   ├── test
│   │   └── infrastructure.test.ts
│   └── tsconfig.json
└── package.json
```
