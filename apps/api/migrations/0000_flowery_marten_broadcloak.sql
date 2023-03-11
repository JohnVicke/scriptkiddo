CREATE TABLE IF NOT EXISTS "chat_servers" (
	"id" serial PRIMARY KEY NOT NULL,
	"server_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
