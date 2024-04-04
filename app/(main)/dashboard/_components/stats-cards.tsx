import { getFormStats } from "@/actions/form-actions";
import React from "react";
import { StatsCard } from "./stats-card";
import { ListPlus, MousePointerClick, Undo, View } from "lucide-react";

type Props = {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
};
export const StatsCards = ({ data, loading }: Props) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={
          <View className="text-blue-600 group-hover:text-blue-400 transition-all" />
        }
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-sm shadow-blue-600 hover:shadow-blue-400 transition-all group"
      />

      <StatsCard
        title="Total submissions"
        icon={
          <ListPlus className="text-yellow-600 group-hover:text-yellow-400 transition-all" />
        }
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-sm shadow-yellow-600 hover:shadow-yellow-400 transition-all group"
      />

      <StatsCard
        title="Submission rate"
        icon={
          <MousePointerClick className="text-green-600 group-hover:text-green-400 transition-all" />
        }
        helperText="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-sm shadow-green-600 hover:shadow-green-400 transition-all group"
      />

      <StatsCard
        title="Bounce rate"
        icon={
          <Undo className="text-red-800 group-hover:text-red-600 transition-all" />
        }
        helperText="Visits that leaves without interacting"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-sm shadow-red-800 hover:shadow-red-600 transition-all group"
      />
    </div>
  );
};
