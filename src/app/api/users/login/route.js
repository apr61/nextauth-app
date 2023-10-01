import connect from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        const user = await User.findOne({email})
        // Check user
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        // Check password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax"
        })
        return response
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET(request){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({
            message: "user found",
            user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}