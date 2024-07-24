import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

interface SessionUser {
  user: {
    id: string;
  };
  userId: string;
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) return null;

    return {
      user: session.user,
      userId: session.user.id
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};