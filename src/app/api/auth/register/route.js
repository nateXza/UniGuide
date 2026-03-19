import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import rateLimit from '@/lib/rate-limit';

const prisma = new PrismaClient();

const limiter = rateLimit({
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 500,
});

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    name: z.string().optional(),
});

export async function POST(req) {
    try {
        // Enforce Rate Limiting (10 requests per 15 minutes per IP)
        const ip = req.headers.get('x-forwarded-for') || 'anonymous';
        try {
            await limiter.check(10, ip);
        } catch {
            return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
        }

        const body = await req.json();
        
        // Zod Input Validation
        const parsed = registerSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
        }
        
        const { email, password, name } = parsed.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'user', // Default value
            },
        });

        // Don't return the password
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
    }
}
