

import User from "@/app/lib/models/user";
import connectToDb from "@/app/lib/utiis";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';


export const { 
    handlers: { GET, POST }, 
    auth,
    signIn,
    signOut 
  } = NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }},

        async authorize(credentials) {
          if (!credentials?.username || !credentials?.password) {
           throw new Error(`Both username and password are required.`);
          }

  
          try {
            await connectToDb();
            
            // หา user ที่ส่งใน database ส่งมาจาก input
            const user = await User.findOne({ username: credentials.username }).select('+password');
  
            if (!user ) {
              console.log("User not found or user.credentails is missing");
              throw new Error('Invalid username or password.');
            }

            console.log("user found:", user);
            
            // ตรวจสอบรหัสผ่านด้วย bcrypt
            const isValid = await bcrypt.compare( credentials.password, user.password );
            console.log("Compare Result:", isValid);
  
            if (!isValid) {
                console.log("Password validation:", isValid);
                console.log("Hashed Password from DB:", user.password);
                console.log("Entered Password:", credentials.password);
              return null
            }
            
            // return user info
            return {
              id: user._id.toString(),
              username: user.username,
              isAdmin: user.isAdmin || false

            }
      
        } catch (error) {
            console.error('Authentication error:', error);
            return null;
          }
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id ?? "" //กำหนดค่าเริ่มต้นเป็น "" หาก id เป็น undefined
          token.username = user.username ?? "" //กำหนดค่าเริ่มต้นเป็น ""
          token.isAdmin = user.isAdmin ?? false //กำหนดค่าเริ่มต้นเป็น false
        }
        return token;

      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.username = token.username as string; //
          session.user.isAdmin = token.isAdmin || false;
        }
        return session;

      }


    },
    pages: {
      signIn: '/login',
    },
    session: {
      strategy: 'jwt',
      maxAge: 1800,
    },
    secret: process.env.NEXTAUTH_SECRET,

  });
  


 