import { Mail, Shield, UserRound } from "lucide-react";

import { getUsers } from "@/service/getUsers";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminUsersPage() {
  const users = await getUsers();
  console.log("users", users);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">All Users</h1>

        <p className="text-muted-foreground">View all registered users.</p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {users.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">User ID</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <UserRound className="size-4" />
                          </div>

                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="size-4" />
                          {user.email}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <Badge
                          variant="secondary"
                          className="border-0 bg-primary/10 text-primary">
                          <Shield className="mr-1 size-3" />
                          {user.role}
                        </Badge>
                      </td>

                      <td className="max-w-[200px] truncate px-4 py-4 text-sm text-muted-foreground">
                        {user.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
