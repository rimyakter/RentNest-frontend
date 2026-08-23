import { MapPin, Home as HomeIcon, BedDouble, Bath } from "lucide-react";
import Link from "next/link";

import { getProperties } from "@/service/getProperties";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <section className="rise space-y-3">
        <Badge variant="secondary">
          {properties.length} properties available
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight text-balance">
          Find your perfect rental home.
        </h1>

        <p className="max-w-md text-muted-foreground text-pretty">
          Browse properties, compare amenities, and find a place that feels like
          home.
        </p>
      </section>

      {properties.length === 0 ? (
        <div className="rise mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed py-20">
          <HomeIcon className="size-8 text-muted-foreground" />

          <p className="text-sm text-muted-foreground">
            No properties available right now.
          </p>
        </div>
      ) : (
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card
                style={{
                  animationDelay: `${Math.min(i, 6) * 50}ms`,
                }}
                className="rise group/property overflow-hidden transition-shadow duration-200 hover:shadow-md">
                <CardContent className="space-y-4 p-0">
                  <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-muted">
                    {property.image ? (
                      <img
                        src={property.image}
                        alt={property.title}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/property:scale-105"
                      />
                    ) : (
                      <HomeIcon className="size-10 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="space-y-2 px-6">
                    <h2 className="line-clamp-1 leading-snug font-semibold">
                      {property.title}
                    </h2>

                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      {property.address}, {property.city}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BedDouble className="size-4" />
                        {property.bedrooms} beds
                      </span>

                      <span className="flex items-center gap-1">
                        <Bath className="size-4" />
                        {property.bathrooms} baths
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="justify-between px-6 pb-6">
                  <span className="text-lg font-semibold tabular-nums">
                    ${property.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </span>

                  <Badge variant={property.available ? "outline" : "secondary"}>
                    {property.available ? "Available" : "Unavailable"}
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
