FROM node:24-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY --chmod=755 tools/auth_scr.sh /auth_scr.sh

EXPOSE 3000

ENTRYPOINT ["/auth_scr.sh"]
