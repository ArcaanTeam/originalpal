CREATE TABLE "originalpal"."files" (
	"id" uuid PRIMARY KEY NOT NULL,
	"uploader_id" uuid NOT NULL,
	"original_name" varchar(255) NOT NULL,
	"storage_key" text NOT NULL,
	"mime_type" varchar(127) NOT NULL,
	"size_bytes" bigint NOT NULL,
	"sha256" varchar(64) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "originalpal"."files" ADD CONSTRAINT "files_uploader_id_fkey" FOREIGN KEY ("uploader_id") REFERENCES "originalpal"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "files_storage_key_key" ON "originalpal"."files" USING btree ("storage_key");--> statement-breakpoint
CREATE INDEX "files_uploader_id_created_at_idx" ON "originalpal"."files" USING btree ("uploader_id","created_at");