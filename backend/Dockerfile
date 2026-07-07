# Optional: Use Docker deployment on Render instead of native Node
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

# Run migrations then start
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm start"]
