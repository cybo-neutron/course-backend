CREATE TYPE "public"."type" AS ENUM('text', 'image', 'video', 'pdf');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"main_content" text,
	"type" "type" DEFAULT 'text',
	"parentContentId" uuid,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "description" text;