import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, BedDouble, Bath, User, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getProperty } from "@/service/getProperty";
import { getMe } from "@/service/getMe";
import RentalRequestForm from "../../_components/RentalRequestForm";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const property = await getProperty(id);
  const user = await getMe();

  if (!property) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Back */}
      <Link
        href="/"
        className="rise mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" />
        Back to properties
      </Link>

      {/* Property overview */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Property image */}
        <div className="rise relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Property information */}
        <div className="rise space-y-5" style={{ animationDelay: "60ms" }}>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-balance">
                {property.title}
              </h1>

              <Badge
                variant={property.available ? "default" : "secondary"}
                className={
                  property.available
                    ? "border-0 bg-primary/10 text-primary"
                    : ""
                }>
                {property.available ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <p className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />
              {property.address}, {property.city}
            </p>
          </div>

          {/* Price */}
          <div>
            <span className="text-3xl font-bold tabular-nums tracking-tight">
              ৳{property.price.toLocaleString()}
            </span>

            <span className="text-base text-muted-foreground"> / month</span>
          </div>

          {/* Property stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-lg border px-4 py-3">
              <BedDouble className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-semibold">{property.bedrooms}</p>
                <p className="text-xs text-muted-foreground">Bedrooms</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border px-4 py-3">
              <Bath className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-semibold">{property.bathrooms}</p>
                <p className="text-xs text-muted-foreground">Bathrooms</p>
              </div>
            </div>
          </div>

          {/* Category */}
          {property.category && (
            <Badge variant="outline">{property.category.name}</Badge>
          )}

          {/* Landlord */}
          {property.owner && (
            <div className="flex items-center gap-3 border-t pt-5">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <User className="size-5 text-muted-foreground" />
              </div>

              <div>
                <p className="text-sm font-medium">{property.owner.name}</p>

                <p className="text-xs text-muted-foreground">Landlord</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <Card
        className="rise mt-10 shadow-sm"
        style={{ animationDelay: "100ms" }}>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">About this property</h2>

          <p className="leading-7 text-muted-foreground">
            {property.description}
          </p>
        </CardContent>
      </Card>

      {/* Reviews */}
      {property.reviews && property.reviews.length > 0 && (
        <Card
          className="rise mt-6 shadow-sm"
          style={{ animationDelay: "140ms" }}>
          <CardContent className="space-y-5">
            <h2 className="text-xl font-semibold">Reviews</h2>

            <div className="space-y-5">
              {property.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {review.renter?.name ?? "Tenant"}
                    </p>

                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-current" />
                      <span className="text-sm">{review.rating}/5</span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rental request */}
      <Card
        className="rise mt-10 shadow-sm"
        style={{ animationDelay: "180ms" }}>
        <CardContent className="py-2">
          {!user ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Sign in to request this property.
              </p>

              <Link href="/auth/login">
                <Button className="press">Sign in</Button>
              </Link>
            </div>
          ) : user.role !== "TENANT" ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Only tenants can request rental properties. You&apos;re signed in
              as {user.role}.
            </p>
          ) : !property.available ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              This property is currently unavailable.
            </p>
          ) : (
            <RentalRequestForm property={property} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
