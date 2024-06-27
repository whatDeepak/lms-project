import { db } from "@/lib/db";

export const checkPurchase = async (userId: string, courseId: string) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return !!purchase;
  } catch (error) {
    console.error("[CHECK_PURCHASE]", error);
    return false;
  }
};
