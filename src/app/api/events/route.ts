import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-crm-api-key');
    if (apiKey !== process.env.CRM_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      type, 
      actorName, 
      targetId, 
      targetTitle, 
      targetType,
      metadata 
    } = body;

    if (!type || !actorName || !targetId || !targetTitle || !targetType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const event = await prisma.activityEvent.create({
      data: {
        type,
        actorName,
        targetId,
        targetTitle,
        targetType,
        metadata: metadata ? JSON.stringify(metadata) : null,
        timestamp: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      id: event.id,
      timestamp: event.timestamp 
    });

  } catch (error: any) {
    console.error('[API Ingest Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
