import { Suspense } from "react";
import { StatsCards } from "./_components/stats-cards";
import { getForms, getFormStats } from "@/actions/form-actions";
import { Separator } from "@/components/ui/separator";
import { CreateFormButton } from "@/components/create-form-button";
import { FormCard, FormCardSkeleton } from "./_components/form-card";

export default async function DashboardPage() {
  const stats = await getFormStats();
  const forms = await getForms();
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsCards loading={false} data={stats} />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <>
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </>
        </Suspense>
      </div>
    </div>
  );
}
