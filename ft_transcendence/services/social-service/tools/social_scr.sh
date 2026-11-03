#!/bin/bash
set -e

echo "Checking Prisma installation..."

if [ ! -x ./node_modules/.bin/prisma ]; then
    echo "Prisma is missing!"
    exit 1
fi

echo "Generating Prisma Client..."
./node_modules/.bin/prisma generate --config prisma.config.ts

echo "Applying pending migrations..."
./node_modules/.bin/prisma migrate deploy --config prisma.config.ts

echo "Starting NestJS..."
exec npm run start:dev