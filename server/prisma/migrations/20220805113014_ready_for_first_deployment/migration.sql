/*
  Warnings:

  - A unique constraint covering the columns `[interest_name]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProfileInterests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationshipStatusCode" AS ENUM ('REQUESTED', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "TutorOrderTutorConnectStatusCode" AS ENUM ('REQUESTED', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_avatar" VARCHAR,
ADD COLUMN     "profile_avatar_public_id" VARCHAR,
ADD COLUMN     "profile_wallpaper" VARCHAR,
ADD COLUMN     "profile_wallpaper_public_id" VARCHAR,
ADD COLUMN     "tutor_mode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProfileInterests" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Relationship" (
    "requester_id" TEXT NOT NULL,
    "addressee_id" TEXT NOT NULL,
    "status" "RelationshipStatusCode" NOT NULL,
    "conversation_id" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isViewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("requester_id","addressee_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "notifier_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "entity_id" TEXT,
    "message" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isViewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "id" SERIAL NOT NULL,
    "main_type" TEXT NOT NULL,
    "sub_type" TEXT NOT NULL,

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message_author_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "message_content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "conversation_name" TEXT,
    "conversation_avatar" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationGroup" (
    "conversation_member_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT true,
    "isViewed" BOOLEAN NOT NULL DEFAULT true,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMP(3),

    CONSTRAINT "ConversationGroup_pkey" PRIMARY KEY ("conversation_member_id","conversation_id")
);

-- CreateTable
CREATE TABLE "TutorOrder" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "tutor_id" TEXT,
    "problem" TEXT NOT NULL,
    "tutor_requirements" VARCHAR(200) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorOrderTutorConnect" (
    "tutor_order_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "status" "TutorOrderTutorConnectStatusCode" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorOrderTutorConnect_pkey" PRIMARY KEY ("tutor_id","tutor_order_id")
);

-- CreateTable
CREATE TABLE "TutorOrderInterests" (
    "tutor_order_id" TEXT NOT NULL,
    "interest_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorOrderInterests_pkey" PRIMARY KEY ("tutor_order_id","interest_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_interest_name_key" ON "Interest"("interest_name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_createdAt_key" ON "Profile"("createdAt");

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_addressee_id_fkey" FOREIGN KEY ("addressee_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notifier_id_fkey" FOREIGN KEY ("notifier_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "NotificationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_message_author_id_fkey" FOREIGN KEY ("message_author_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationGroup" ADD CONSTRAINT "ConversationGroup_conversation_member_id_fkey" FOREIGN KEY ("conversation_member_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationGroup" ADD CONSTRAINT "ConversationGroup_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorOrder" ADD CONSTRAINT "TutorOrder_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorOrder" ADD CONSTRAINT "TutorOrder_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorOrderTutorConnect" ADD CONSTRAINT "TutorOrderTutorConnect_tutor_order_id_fkey" FOREIGN KEY ("tutor_order_id") REFERENCES "TutorOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorOrderTutorConnect" ADD CONSTRAINT "TutorOrderTutorConnect_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorOrderInterests" ADD CONSTRAINT "TutorOrderInterests_tutor_order_id_fkey" FOREIGN KEY ("tutor_order_id") REFERENCES "TutorOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorOrderInterests" ADD CONSTRAINT "TutorOrderInterests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
