'use server'

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  groupSize: string
  eventDate: string
  message: string
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function generateAdminEmailHtml(data: ContactFormData): string {
  const eventDateFormatted = data.eventDate 
    ? new Date(data.eventDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Not specified'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border-radius: 24px; border: 1px solid rgba(255,215,0,0.2); overflow: hidden;">
          
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,215,0,0.3);">
              <div style="font-size: 14px; letter-spacing: 6px; color: rgba(255,215,0,0.8); text-transform: uppercase; margin-bottom: 12px;">New Inquiry</div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 300; color: #ffffff; letter-spacing: 2px;">Lake Como Style</h1>
              <div style="width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #ffd700, transparent); margin: 20px auto 0;"></div>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                
                <tr>
                  <td style="padding-bottom: 30px;">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                      <span style="color: rgba(255,215,0,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 3px;">Guest Name</span>
                    </div>
                    <div style="color: #ffffff; font-size: 24px; font-weight: 300; letter-spacing: 1px;">${data.firstName} ${data.lastName}</div>
                    <div style="height: 1px; background: linear-gradient(90deg, rgba(255,215,0,0.3), transparent); margin-top: 16px;"></div>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-bottom: 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 15px;">
                          <div style="color: rgba(255,215,0,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px;">Email</div>
                          <a href="mailto:${data.email}" style="color: #ffffff; font-size: 16px; text-decoration: none;">${data.email}</a>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 15px;">
                          <div style="color: rgba(255,215,0,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px;">Phone</div>
                          <div style="color: #ffffff; font-size: 16px;">${data.countryCode} ${data.phone || 'Not provided'}</div>
                        </td>
                      </tr>
                    </table>
                    <div style="height: 1px; background: linear-gradient(90deg, rgba(255,215,0,0.3), transparent); margin-top: 20px;"></div>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-bottom: 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 15px;">
                          <div style="color: rgba(255,215,0,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px;">Group Size</div>
                          <div style="color: #ffffff; font-size: 16px;">${data.groupSize || 'Not specified'}</div>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 15px;">
                          <div style="color: rgba(255,215,0,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px;">Event Date</div>
                          <div style="color: #ffffff; font-size: 16px;">${eventDateFormatted}</div>
                        </td>
                      </tr>
                    </table>
                    <div style="height: 1px; background: linear-gradient(90deg, rgba(255,215,0,0.3), transparent); margin-top: 20px;"></div>
                  </td>
                </tr>
                
                ${data.message ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <div style="color: rgba(255,215,0,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 12px;">Message</div>
                    <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; border-left: 3px solid rgba(255,215,0,0.5);">
                      <p style="color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.8; margin: 0; font-style: italic;">"${data.message}"</p>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background: rgba(255,215,0,0.05); padding: 25px 40px; text-align: center; border-top: 1px solid rgba(255,215,0,0.2);">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0; letter-spacing: 1px;">Received via Lake Como Style Contact Form</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function generateConfirmationEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border-radius: 24px; border: 1px solid rgba(255,215,0,0.2); overflow: hidden;">
          
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 50px 40px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto 24px; background: linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.1) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,215,0,0.3);">
                <span style="font-size: 36px;">✨</span>
              </div>
              <h1 style="margin: 0 0 16px; font-size: 36px; font-weight: 300; color: #ffffff; letter-spacing: 3px;">Thank You</h1>
              <p style="margin: 0; font-size: 14px; color: rgba(255,215,0,0.8); text-transform: uppercase; letter-spacing: 4px;">The Spotlight Awaits</p>
              <div style="width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #ffd700, transparent); margin: 24px auto 0;"></div>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 50px 40px;">
              <p style="color: #ffffff; font-size: 20px; font-weight: 300; margin: 0 0 24px; line-height: 1.6;">Dear ${data.firstName},</p>
              
              <p style="color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.8; margin: 0 0 24px;">
                We have received your inquiry and are thrilled that you're considering Lake Como Style for your unforgettable cinematic experience.
              </p>
              
              <p style="color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.8; margin: 0 0 32px;">
                Our team of creative professionals will review your request and get back to you within <strong style="color: #ffd700;">24-48 hours</strong> to discuss how we can bring your vision to life on the stunning shores of Lake Como.
              </p>
              
              <div style="background: rgba(255,215,0,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,215,0,0.2); margin-bottom: 32px;">
                <div style="color: rgba(255,215,0,0.8); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px; text-align: center;">Your Inquiry Summary</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 8px 0;">Name:</td>
                    <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right;">${data.firstName} ${data.lastName}</td>
                  </tr>
                  ${data.groupSize ? `
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 8px 0;">Group Size:</td>
                    <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right;">${data.groupSize}</td>
                  </tr>
                  ` : ''}
                  ${data.eventDate ? `
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 8px 0;">Event Date:</td>
                    <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right;">${new Date(data.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.8; margin: 0 0 16px;">
                In the meantime, feel free to explore more of what we offer:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="https://lakecomostyle.it/gallery" style="display: inline-block; background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%); color: #0a0a0a; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">View Our Gallery</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.7; margin: 0;">
                Warm regards,<br>
                <strong style="color: #ffffff;">The Lake Como Style Team</strong>
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="background: rgba(255,215,0,0.05); padding: 30px 40px; text-align: center; border-top: 1px solid rgba(255,215,0,0.2);">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 8px; letter-spacing: 1px;">Lake Como Style</p>
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Creating Unforgettable Cinematic Experiences in Italy</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: `"Lake Como Style" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Inquiry from ${body.firstName} ${body.lastName}`,
      html: generateAdminEmailHtml(body),
    })

    await transporter.sendMail({
      from: `"Lake Como Style" <${process.env.EMAIL_USER}>`,
      to: body.email,
      subject: 'Thank You for Contacting Lake Como Style ✨',
      html: generateConfirmationEmailHtml(body),
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully' 
    })

  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
