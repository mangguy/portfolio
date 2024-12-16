import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'  // แนะนำให้ใช้ zod สำหรับ validation

// Schema validation ด้วย zod
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  message: z.string().min(4, { message: "Message must be at least 4 characters" })
})

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json()

    // Validate input with zod
    const validatedData = ContactFormSchema.parse(body)

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD
        },
        
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      text: `
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        Phone: ${validatedData.phone || 'Not provided'}
        
        Message:
        ${validatedData.message}
      `,
      html: `
       <h2 style="color: #4CAF50; font-size: 24px; font-family: Poppins, sans-serif;">New Contact Form Submission</h2>
        <p style="font-family: Poppins, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
            <strong style="color: #000;">Name:</strong> ${validatedData.name}
        </p>
        <p style="font-family: Poppins, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
            <strong style="color: #000;">Email:</strong> ${validatedData.email}
        </p>
        <p style="font-family: Poppins, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
            <strong style="color: #000;">Phone:</strong> ${validatedData.phone || 'Not provided'}
        </p>

        <p style="color: #333; font-size: 18px; font-family: Poppins, sans-serif;">Message:</p>
        <p style="font-family: Poppins, sans-serif; font-size: 14px; color: #555; line-height: 1.6; background-color: #f4f4f4; padding: 10px; border-radius: 4px;">
            ${validatedData.message}
        </p>
      `
    })

    // Respond with success
    return NextResponse.json(
      { message: 'Email sent successfully' }, 
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    
    // Handle zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Invalid input', 
          errors: error.errors 
        }, 
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Error sending email' }, 
      { status: 500 }
    )
  }
}