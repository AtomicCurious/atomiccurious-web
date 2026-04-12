-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Download" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetSlug" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "linkId" TEXT,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DownloadLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "clickedAt" TIMESTAMP(3),
    "assetSlug" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "DownloadLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "confirmTokenHash" TEXT,
    "confirmExpiresAt" TIMESTAMP(3),
    "unsubscribeTokenHash" TEXT,
    "subscribedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "source" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Download_assetSlug_idx" ON "public"."Download"("assetSlug" ASC);

-- CreateIndex
CREATE INDEX "Download_createdAt_idx" ON "public"."Download"("createdAt" ASC);

-- CreateIndex
CREATE INDEX "Download_leadId_idx" ON "public"."Download"("leadId" ASC);

-- CreateIndex
CREATE INDEX "Download_linkId_idx" ON "public"."Download"("linkId" ASC);

-- CreateIndex
CREATE INDEX "DownloadLink_assetSlug_idx" ON "public"."DownloadLink"("assetSlug" ASC);

-- CreateIndex
CREATE INDEX "DownloadLink_clickedAt_idx" ON "public"."DownloadLink"("clickedAt" ASC);

-- CreateIndex
CREATE INDEX "DownloadLink_createdAt_idx" ON "public"."DownloadLink"("createdAt" ASC);

-- CreateIndex
CREATE INDEX "DownloadLink_leadId_idx" ON "public"."DownloadLink"("leadId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "DownloadLink_tokenHash_key" ON "public"."DownloadLink"("tokenHash" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "public"."Lead"("email" ASC);

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_createdAt_idx" ON "public"."NewsletterSubscriber"("createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "public"."NewsletterSubscriber"("email" ASC);

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_status_idx" ON "public"."NewsletterSubscriber"("status" ASC);

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_subscribedAt_idx" ON "public"."NewsletterSubscriber"("subscribedAt" ASC);

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_unsubscribedAt_idx" ON "public"."NewsletterSubscriber"("unsubscribedAt" ASC);

-- AddForeignKey
ALTER TABLE "public"."Download" ADD CONSTRAINT "Download_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Download" ADD CONSTRAINT "Download_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."DownloadLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DownloadLink" ADD CONSTRAINT "DownloadLink_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
