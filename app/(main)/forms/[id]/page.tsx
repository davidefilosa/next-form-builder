import React, { ReactNode } from "react";
import { StatsCard } from "../../dashboard/_components/stats-card";
import {
  LayoutDashboard,
  ListPlus,
  MousePointerClick,
  Undo,
  View,
} from "lucide-react";
import { getFormById, getFormWithSubmissions } from "@/actions/form-actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VisitButton } from "@/components/visit-button";
import { FormLinkShare } from "@/components/form-link-share";
import { ElementsType, FormElementInstance } from "@/components/form-elements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CSVLink } from "react-csv";
import { CsvButton } from "@/components/csv-buttton";

const FormsIdPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const form = await getFormById(id);
  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="py-10 border-b border-muted w-full">
        <div className="flex justify-between container gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold truncate">{form.name}</h1>
            <VisitButton shareUrl={form.shareURL} />
          </div>
          <Button asChild variant={"outline"} className="flex gap-2">
            <Link href="/dashboard">
              <LayoutDashboard className="w-6 h-6" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
      <div className="py-4 border-b border-muted w-full">
        <div className="container flex gap-4 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="Total visits"
          icon={
            <View className="text-blue-600 group-hover:text-blue-400 transition-all" />
          }
          helperText="All time form visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-sm shadow-blue-600 hover:shadow-blue-400 transition-all group"
        />

        <StatsCard
          title="Total submissions"
          icon={
            <ListPlus className="text-yellow-600 group-hover:text-yellow-400 transition-all" />
          }
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-sm shadow-yellow-600 hover:shadow-yellow-400 transition-all group"
        />

        <StatsCard
          title="Submission rate"
          icon={
            <MousePointerClick className="text-green-600 group-hover:text-green-400 transition-all" />
          }
          helperText="Visits that result in form submission"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-sm shadow-green-600 hover:shadow-green-400 transition-all group"
        />

        <StatsCard
          title="Bounce rate"
          icon={
            <Undo className="text-red-800 group-hover:text-red-600 transition-all" />
          }
          helperText="Visits that leaves without interacting"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-sm shadow-red-800 hover:shadow-red-600 transition-all group"
        />
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  );
};

export default FormsIdPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: string }) {
  const form = await getFormWithSubmissions(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((el) => {
    switch (el.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: el.id,
          label: el.extraAttributes?.label,
          required: el.extraAttributes?.required,
          type: el.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  const arr = rows.map((row) => columns.map((col) => row[col.id]));
  const csvData = [columns.map((col) => col.label), ...arr];

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold my-4">Submissions</h1>
        <CsvButton data={csvData} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  return <TableCell>{node}</TableCell>;
}
