/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `dashboards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dashboards_id_user_id_key" ON "public"."dashboards"("id", "user_id");
