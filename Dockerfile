FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22 AS runner

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 4321

CMD ["npm", "run", "preview"]