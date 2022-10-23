-- CreateTable
CREATE TABLE "projects" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "cost" INTEGER,
    "votes" INTEGER,
    "projectsize" TEXT,
    "description" TEXT,
    "location" TEXT,
    "isAproverd" BOOLEAN,
    "city" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "city" TEXT,
    "PESEL" INTEGER,
    "name" TEXT,
    "surname" TEXT,
    "phone" INTEGER,
    "isGov" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
