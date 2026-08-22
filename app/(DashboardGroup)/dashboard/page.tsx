import { Mail, Shield, Fingerprint } from "lucide-react";
import { getMe } from "@/service/getMe";
// import { getMyBookings } from "@/service/getBookings";
// import { BookingList } from "@/components/shared/booking-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getMe();

  //   const bookings = user?.role === "TENANT" ? await getMyBookings() : [];

  const rows = [
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Shield, label: "Role", value: user?.role },
    { icon: Fingerprint, label: "User ID", value: user?.id },
  ];

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <div className="rise space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your account at a glance.</p>
      </div>

      <Card className="rise mt-8 shadow-sm" style={{ animationDelay: "60ms" }}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-xl font-semibold text-primary">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0 space-y-1">
              <p className="truncate text-lg leading-snug font-medium">
                {user?.name}
              </p>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-0">
                {user?.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <dl className="divide-y">
            {rows.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 py-3">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="size-4" />
                  {label}
                </dt>
                <dd className="truncate text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {user?.role === "TENANT" && (
        <section className="mt-10">
          <h2 className="rise text-sm font-medium text-muted-foreground" style={{ animationDelay: "120ms" }}>
            Your bookings
          </h2>
          <div className="mt-4">
            {/* <BookingList bookings={bookings} payable /> */}
            <p>Hello Tenant!</p>
          </div>
        </section>
      )}
      
      {user?.role === "LANDLORD" && (
        <section className="mt-10">
          <h2 className="rise text-sm font-medium text-muted-foreground" style={{ animationDelay: "120ms" }}>
            Your bookings
          </h2>
          <div className="mt-4">
            {/* <BookingList bookings={bookings} payable /> */}
            <p>Hello Landlord!</p>
          </div>
        </section>
      )}
      
      {user?.role === "ADMIN" && (
        <section className="mt-10">
          <h2 className="rise text-sm font-medium text-muted-foreground" style={{ animationDelay: "120ms" }}>
            Your bookings
          </h2>
          <div className="mt-4">
            {/* <BookingList bookings={bookings} payable /> */}
            <p>Hello Admin!</p>
          </div>
        </section>
      )}
    </main>
  );
}
