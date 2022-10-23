-- CreateTable
CREATE TABLE "votedProjects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "votedProjects_pkey" PRIMARY KEY ("id")
);
