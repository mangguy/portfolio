import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDb from '@/app/lib/utiis';
import User from '@/app/lib/models/user';

export async function POST(request: NextRequest) {
  try {

    // รับข้อมูลจาก req
    const { username, password, isAdmin} = await request.json();

    // ตรวจสอบ username กับ password
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    await connectToDb();

      // ตรวจสอบว่ามีผู้ใช้นี้อยู่แล้วหรือไม่
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return NextResponse.json( { error: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' },  { status: 400 } );
      }
    
    // สร้าง hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword );

    if(!hashedPassword) {
        return NextResponse.json({ error: 'Hash Not success!!' }, { status: 400 });
    }

    // สร้างข้อมูล user
    const newUser = new User({
        username,
        password: hashedPassword, // ใช้ hashed password
        isAdmin
      });

    //บันทึกข้อมูลใหม่ ลงในฐานข้อมูล
      await newUser.save();

    return NextResponse.json({ hashedPassword, message: 'Password hashed successfully' }, { status: 200 });

  } catch (error) {
    console.error('Password hashing error:', error);
    return NextResponse.json({  error: 'Failed to hash password' }, { status: 500 });
  }
}


