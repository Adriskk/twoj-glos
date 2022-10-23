-- CreateTable
CREATE TABLE "userProjects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "userProjects_pkey" PRIMARY KEY ("id")
);
