-- CreateTable
CREATE TABLE "Usertwo" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usertwo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usertwo_username_key" ON "Usertwo"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usertwo_email_key" ON "Usertwo"("email");
