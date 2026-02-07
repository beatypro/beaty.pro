import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, company, projectType, budget, description } =
      await request.json();

    if (!name || !email || !projectType || !budget || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: 'beaty.pro <noreply@beaty.pro>',
      to: 'chris@beaty.pro',
      replyTo: email,
      subject: `Quote Request: ${projectType} - ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'Not provided'}`,
        `Project Type: ${projectType}`,
        `Budget Range: ${budget}`,
        '',
        'Project Description:',
        description,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
