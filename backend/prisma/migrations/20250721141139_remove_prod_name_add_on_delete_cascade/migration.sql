/*
  Warnings:

  - You are about to drop the column `prodName` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnalysisResult" DROP CONSTRAINT "AnalysisResult_commentId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "prodName";

-- AddForeignKey
ALTER TABLE "AnalysisResult" ADD CONSTRAINT "AnalysisResult_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
