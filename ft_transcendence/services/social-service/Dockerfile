FROM node:24-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY --chmod=755 tools/social_scr.sh /social_scr.sh

EXPOSE 3000

ENTRYPOINT ["/social_scr.sh"]
