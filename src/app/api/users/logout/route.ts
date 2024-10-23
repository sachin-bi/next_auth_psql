import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successfully!!",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
    // expires: new Date('2025-01-01')
    // Expires in 7 days
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
