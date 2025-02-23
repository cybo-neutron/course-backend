CREATE TYPE "public"."status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "content" ADD COLUMN "status" "status" DEFAULT 'draft' NOT NULL;