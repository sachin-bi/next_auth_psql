import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const prisma = new PrismaClient();
    // console.log("----user query!");
    const user = await prisma.usertwo.findUnique({
      where: {
        email: email,
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
    const passwordMatch = await bcrypt.compare(password, user?.password!);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "+ me, Entered wrong Password..!!",
          success: false,
          userDetails: user.email,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "-me, password matched",
        success: true,
        userDetails: user,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("---err from login route:", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
