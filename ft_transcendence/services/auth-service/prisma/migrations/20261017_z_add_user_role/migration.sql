CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'CLUB');

ALTER TABLE "User"
ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';

UPDATE "User"
SET "role" = 'ADMIN'
WHERE "isAdmin" = true;