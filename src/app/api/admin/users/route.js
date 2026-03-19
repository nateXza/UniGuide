import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { userId, role } = await req.json();

        if (!userId || !['user', 'admin'].includes(role)) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: { id: true, email: true, role: true },
        });

        // Create audit log entry
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: 'UPDATE_USER_ROLE',
                details: JSON.stringify({
                    targetUserId: userId,
                    targetEmail: updatedUser.email,
                    newRole: role,
                }),
            },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error('Admin user update error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
