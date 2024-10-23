import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

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
    // console.log("----password match", passwordMatch);

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
    // user is verified here after login

    const tokenData = {
      // usually only id is kept here, otherwise it'll consume more bandwidth in network
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    // expiresIn: expressed in seconds or a string describing a time span vercel/ms.
    // Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "-me, password matched",
        success: true,
        userDetails: user,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { 
      httpOnly: true 
    });

    return response;

  } catch (err: any) {
    console.log("---err from login route:", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
