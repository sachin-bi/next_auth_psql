import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    
      const token = request.cookies.get("token")?.value || "";
    //   console.log("-----YO, token fetched here:", token);
      
      const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //   console.log("-----YO, DECODEDtoken fetched here:", decodedToken);
      
    return decodedToken.id;


  } catch (error: any) {
    console.log("---err.msg throwed from getDataFromToken.ts");
    // console.log(error);
    throw new Error(error.message);
  }
};
