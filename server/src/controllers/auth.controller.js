import prisma from "../config/prisma.js";
import bcrypt from  "bcrypt"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js"
import { sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail } from "../mail/emails.js";
import crypto from "crypto"


const clientUrl = process.env.CLIENT_URL


export async function signup(req, res) {
    const { name, email, password } = req.body;
    try{
        if( !email || !password || !name ){
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await prisma.user.findUnique({
            where: { email: email },
        })
        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data:{
                email, password:hashedPassword, name  
            }
        })
        console.log("New user added 🥳🥳🥳")
        generateTokenAndSetCookie(res,user.id)
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() } 
        });
        sendWelcomeEmail(user.email, user.name, clientUrl)
        res.status(201).json({ success: true, message: 'User created', user: { ...user, password : undefined}})        
    }catch (err){
        res.status(400).json({ success: false,error: err.message});
    }
}

export async function login(req,res){
   const {email, password} = req.body
   try {
        if( !email || !password){
            throw new Error("All fields are required")
        }
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new Error("Invalid Credntials")
        }
       generateTokenAndSetCookie(res, user.id);
       await prisma.user.update({
           where: { id: user.id },
           data: { lastLogin: new Date() } 
       });
       res.status(200).json({ success: true, message: 'User logged in successfully ', user: { ...user, password: undefined } })    
   } catch (err) {
       res.status(400).json({ success: false, error: err.message });
   }
}

export async function  logout (req, res){
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out' });
}

export async function checkAuth(req,res){
    try {
        const user = await prisma.user.findUnique({
            omit: {password: true},
            where: { id: req.userId }
        });

        if(!user){
            throw new Error("User does not exist")
        }
        res.status(200).json({ success: true, user:user });
    } catch (error) {
        res.status(403).json({ success: false, error: err.message });
    }
}

export async function forgotPassword(req,res) {
    const {email}=req.body
    try {
        const user = await prisma.user.findUnique({
            where:{email:email}
        })
        if(!user) throw new Error("Account does not exist")
        const resetToken = crypto.randomBytes(64).toString('hex');
        const tokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);// Expires in 30 minutes
        await prisma.user.update({
            where:{email:email},
            data:{resetPasswordToken: resetToken, resetPasswordExpiresAt:tokenExpiresAt}
        })
        sendResetPasswordEmail(email,user.name, `${clientUrl}/reset-password/${resetToken}`)
        res.status(200).json({ success: true, message: 'Email sent to reset password' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
    
}

export async function resetPassword(req, res){
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where:{resetPasswordToken: token,resetPasswordExpiresAt:{gte: new Date(Date.now())}} })
        if(!user) throw new Error("Invalid or expired token")
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.update({
            where:{email:user.email},
            select:{password:true, resetPasswordExpiresAt:true, resetPasswordToken:true},
            data:{password:hashedPassword, resetPasswordExpiresAt:undefined, resetPasswordToken:undefined}
        })
        sendResetSuccessEmail(user.email, `${clientUrl}/login`)
        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message }) 
    }
}