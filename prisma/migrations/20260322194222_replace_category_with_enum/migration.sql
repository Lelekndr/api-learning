/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BookCategory" AS ENUM ('fantasia', 'ficcao_cientifica', 'romance', 'terror', 'biografia', 'autoajuda', 'tecnologia', 'historia', 'outros');

-- DropForeignKey
ALTER TABLE "_BookToCategory" DROP CONSTRAINT "_BookToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToCategory" DROP CONSTRAINT "_BookToCategory_B_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "category" "BookCategory" NOT NULL DEFAULT 'outros';

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_BookToCategory";
