import { NextResponse } from 'next/server';

// Mock database of submissions
const submissions: Record<string, unknown>[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the form data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Store in a database (using Prisma, MongoDB, etc.)
    // 2. Send notification email
    // 3. Maybe integrate with a CRM

    // Mock database storage
    const submission = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };

    submissions.push(submission);
    console.log('New contact form submission:', submission);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

// For demonstration purposes, a GET endpoint to view submissions
// In a real app, this would be protected by authentication
export async function GET() {
  return NextResponse.json({ submissions });
}
