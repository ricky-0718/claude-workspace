FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# SQLiteデータは永続ボリュームに保存
ENV DB_PATH=/data/coach.db
ENV PORT=3860

EXPOSE 3860

CMD ["node", "server/index.js"]
