import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { ArrowRight, ListPlus, Pencil, View } from "lucide-react";
import React from "react";
import { formatDistance } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type Props = {
  form: Form;
};

export const FormCard = ({ form }: Props) => {
  return (
    <Card className="shadow-sm shadow-primary hover:shadow-purple-400 transition">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground w-4 h-4" />
              <span>{form.visits.toLocaleString()}</span>
              <ListPlus className="text-muted-foreground w-4 h-4" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter className="flex justify-end">
        {form.published && (
          <Button asChild className="mt-4 text-sm gap-4" size={"sm"}>
            <Link href={`/forms/${form.id}`}>
              View submissions <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant={"default"}
            className=" mt-4 text-sm gap-4"
            size={"sm"}
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <Pencil className="w-3 h-3" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export const FormCardSkeleton = () => {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
};
