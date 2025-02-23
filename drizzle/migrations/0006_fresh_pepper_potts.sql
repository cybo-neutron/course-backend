CREATE TYPE "public"."readStatus" AS ENUM('unread', 'read', 'in_progreass');--> statement-breakpoint
ALTER TABLE "content" ADD COLUMN "readStatus" "readStatus" DEFAULT 'unread' NOT NULL;