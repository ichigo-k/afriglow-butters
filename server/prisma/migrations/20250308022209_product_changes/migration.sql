-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://placehold.co/600x400',
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
