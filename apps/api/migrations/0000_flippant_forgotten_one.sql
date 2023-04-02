DO $$ BEGIN
 CREATE TYPE "server_member_type" AS ENUM('owner', 'admin', 'member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "server_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"server_member_type" server_member_type DEFAULT 'member',
	"user_id" integer,
	"server_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "server" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE server_member ADD CONSTRAINT server_member_user_id_user_id_fk FOREIGN KEY ("user_id") REFERENCES user("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE server_member ADD CONSTRAINT server_member_server_id_server_id_fk FOREIGN KEY ("server_id") REFERENCES server("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
