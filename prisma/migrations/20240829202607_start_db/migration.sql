-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "customers" (
    "customer_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_code")
);

-- CreateTable
CREATE TABLE "measures" (
    "measure_uuid" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "measure_type" "MeasureType" NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "customer_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("measure_uuid")
);

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers"("customer_code") ON DELETE RESTRICT ON UPDATE CASCADE;
