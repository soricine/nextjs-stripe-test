-- CreateTable
CREATE TABLE "OAuthToken" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL
);
