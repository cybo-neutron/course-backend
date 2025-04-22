ALTER TABLE "public"."user" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."role" CASCADE;--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'mentor', 'student');--> statement-breakpoint
ALTER TABLE "public"."user" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'student';--> statement-breakpoint