-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OAuthToken" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OAuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OAuthToken" ("expiresAt", "token", "userId") SELECT "expiresAt", "token", "userId" FROM "OAuthToken";
DROP TABLE "OAuthToken";
ALTER TABLE "new_OAuthToken" RENAME TO "OAuthToken";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
