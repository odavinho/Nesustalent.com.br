'use client';

import { useState, useMemo } from 'react';
import { users as mockUsers } from '@/lib/users';
import type { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus, FileDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const roleMap: Record<UserProfile['userType'], string> = {
  student: 'Candidato',
  instructor: 'Formador',
  recruiter: 'Recrutador',
  admin: 'Admin',
};

const roleVariantMap: Record<UserProfile['userType'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    admin: 'destructive',
    recruiter: 'default',
    instructor: 'secondary',
    student: 'outline',
};


export default function ManageUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<UserProfile[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        return users.filter(user => 
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button variant="outline" onClick={() => router.back()} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle className="font-headline text-3xl">Gestão de Usuários</CardTitle>
                            <CardDescription>Visualize e gerencie todos os usuários da plataforma.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline" disabled>
                                <FileDown className="mr-2 h-4 w-4"/>
                                Exportar
                            </Button>
                            <Button disabled>
                                <UserPlus className="mr-2 h-4 w-4"/>
                                Adicionar Usuário
                            </Button>
                        </div>
                    </div>
                     <div className="mt-4">
                        <Input
                            placeholder="Filtrar por nome ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Papel</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={roleVariantMap[user.userType] || 'default'}>
                                            {roleMap[user.userType] || user.userType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Abrir menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                            <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                                            <DropdownMenuItem disabled>Alterar Papel</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" disabled>
                                                Excluir
                                            </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
