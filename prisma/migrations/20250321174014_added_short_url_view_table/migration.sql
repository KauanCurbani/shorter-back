-- CreateTable
CREATE TABLE "short_url_views" (
    "id" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "short_url_views_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "short_url_views" ADD CONSTRAINT "short_url_views_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "short_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
