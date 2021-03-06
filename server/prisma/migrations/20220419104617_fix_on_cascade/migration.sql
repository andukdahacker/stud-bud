-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_interest_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
