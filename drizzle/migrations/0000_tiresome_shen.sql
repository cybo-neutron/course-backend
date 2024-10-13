CREATE TABLE IF NOT EXISTS "course" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"password" text
);
