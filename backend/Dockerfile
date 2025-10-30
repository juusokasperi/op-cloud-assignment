FROM public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 AS adapter

FROM public.ecr.aws/docker/library/node:current-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

RUN npm run build
RUN npm prune --production

FROM public.ecr.aws/docker/library/node:current-alpine
WORKDIR /var/task

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=adapter /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
