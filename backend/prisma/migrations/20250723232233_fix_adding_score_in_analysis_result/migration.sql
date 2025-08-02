/*
  Warnings:

  - Added the required column `score` to the `AnalysisResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalysisResult" ADD COLUMN     "score" TEXT NOT NULL;
