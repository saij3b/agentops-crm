import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    if (!isDatabaseConfigured) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const apiSecret = process.env.CRM_API_KEY;
    
    // Guard: Error if API key is not configured in environment
    if (!apiSecret) {
       console.error('[API Ingest]: CRM_API_KEY is not configured.');
       return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const providedKey = req.headers.get('x-crm-api-key');
    if (!providedKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    // Timing-safe comparison to prevent side-channel attacks
    const secretBuffer = Buffer.from(apiSecret);
    const providedBuffer = Buffer.from(providedKey);
    
    if (secretBuffer.length !== providedBuffer.length || !crypto.timingSafeEqual(secretBuffer, providedBuffer)) {
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

    // Strict field validation
    if (!type || !actorName || !targetId || !targetTitle || !targetType) {
      return NextResponse.json({ error: 'Missing required activity fields' }, { status: 400 });
    }

    // Input size limit check (approximate)
    if (JSON.stringify(body).length > 50000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const event = await prisma.activityEvent.create({
      data: {
        id: crypto.randomUUID(),
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

  } catch (error: unknown) {
    console.error('[API Ingest Error]:', error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return NextResponse.json({ error: 'Malformed request or internal error' }, { status });
  }
}
