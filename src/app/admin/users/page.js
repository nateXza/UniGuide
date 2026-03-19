import { PrismaClient } from '@prisma/client';
import UsersClient from './UsersClient';

const prisma = new PrismaClient();

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    });

    // Serialize dates for client component
    const serializedUsers = users.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
    }));

    return <UsersClient initialUsers={serializedUsers} />;
}
