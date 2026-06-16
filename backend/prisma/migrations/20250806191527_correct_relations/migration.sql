/*
  Warnings:

  - You are about to drop the column `commentId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_commentId_fkey";

-- DropIndex
DROP INDEX "user_commentId_key";

-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "commentId";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
