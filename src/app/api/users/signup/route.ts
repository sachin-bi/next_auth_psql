import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // quering if already exists
    const prisma = new PrismaClient();
    // console.log("----user query!");
    const user = await prisma.usertwo.findMany({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });
    // console.log("---user query!! RESULT", user);

    if (user.length > 0) {
      return NextResponse.json(
        {
          message: "username or email already exists,try diff. man!!",
          success: false,
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.usertwo.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserHashedPasswoed, ...rest } = newUser;
    return NextResponse.json(
      {
        message: "yo bro, User registered successfully",
        success: true,
        newUser: rest,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
