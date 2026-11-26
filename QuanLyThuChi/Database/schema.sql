CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

BEGIN TRANSACTION;
CREATE TABLE "Categories" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Categories" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Kind" INTEGER NOT NULL,
    "Color" TEXT NOT NULL,
    "Icon" TEXT NOT NULL
);

CREATE TABLE "Entries" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Entries" PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "Date" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "Status" INTEGER NOT NULL,
    "Notes" TEXT NOT NULL,
    "Revision" INTEGER NOT NULL,
    CONSTRAINT "CK_Entries_Amount" CHECK (Amount > 0 AND Amount <= 999999999999),
    CONSTRAINT "CK_Entries_Status" CHECK (Status IN (0, 1)),
    CONSTRAINT "FK_Entries_Categories_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES "Categories" ("Id") ON DELETE RESTRICT
);

CREATE UNIQUE INDEX "IX_Categories_Name_Kind" ON "Categories" ("Name", "Kind");

CREATE INDEX "IX_Entries_CategoryId" ON "Entries" ("CategoryId");

CREATE INDEX "IX_Entries_Date_Status" ON "Entries" ("Date", "Status");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20261126033127_InitialCreate', '10.0.15');

COMMIT;

