import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const prisma = new PrismaClient();

    // console.log("----user query!");
    const user = await prisma.usertwo.findUnique({
      where: {
        id: userId,
      },
    });

    // console.log("---user from login route:", user);
    if (!user) {
      return NextResponse.json(
        {
          message: "-me, User does not exists",
          success: false,
          userDetails: user,
        },
        { status: 400 }
      );
    }
    const { password, ...rest } = user;
    return NextResponse.json(
      {
        message: "-me, User exists",
        success: true,
        userDetails: rest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("---err in me/route--", error);
  }
}
