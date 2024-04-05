"use client";

import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";

type Props = { data: (string[] | string[][][])[] };

export const CsvButton = ({ data }: Props) => {
  return (
    <CSVLink className="downloadbtn" filename="submissions.csv" data={data}>
      <Button className="flex gap-2" size={"sm"} variant={"outline"}>
        <FileDown className="w-4 h-4" />
        Export CSV
      </Button>
    </CSVLink>
  );
};
