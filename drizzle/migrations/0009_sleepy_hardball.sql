CREATE TYPE "public"."contentCompletionStatus" AS ENUM('completed', 'incomplete', 'in_progress');--> statement-breakpoint
ALTER TYPE "public"."status" ADD VALUE 'unpublished' BEFORE 'archived';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_completion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"courseId" uuid,
	"userId" uuid,
	"contentId" uuid,
	"contentCompletionStatus" "contentCompletionStatus" DEFAULT 'incomplete' NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_enrollment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"courseId" uuid,
	"userId" uuid,
	"enrolledAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource_permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "role" DEFAULT 'student' NOT NULL,
	"attributes" jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content" ADD COLUMN "author" uuid;--> statement-breakpoint
ALTER TABLE "content" ADD COLUMN "isDeleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "content" DROP COLUMN IF EXISTS "readStatus";--> statement-breakpoint
DROP TYPE "public"."readStatus";