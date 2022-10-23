-- AlterTable
CREATE SEQUENCE "projects_id_seq";
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT nextval('projects_id_seq');
ALTER SEQUENCE "projects_id_seq" OWNED BY "projects"."id";
