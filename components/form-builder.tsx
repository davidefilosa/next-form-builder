"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { PreviewDialogButton } from "./preview-dialog-button";
import { SaveFormButton } from "./save-form-button";
import { PublishFormButton } from "./publish-form-button";
import { Designer } from "./designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragOverlayWrapper } from "./drag-overlay-wrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  ArrowBigLeft,
  ArrowBigRight,
  LayoutDashboard,
  Loader,
  RotateCcw,
  User,
} from "lucide-react";
import { useDesigner } from "./hooks/use-designer";
import Confetti from "react-confetti";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { resetDemoForm } from "@/actions/form-actions";
import { SignedOut } from "@clerk/nextjs";

type Props = {
  form: Form;
};
export const FormBuilder = ({ form }: Props) => {
  const pathname = usePathname();
  const isDemo = pathname === "/demo";
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 300, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsReady(true);
    if (isDemo) {
      resetDemoForm("661cd9afb3c419ddd45bc4bc");
    }
  }, [form, setElements]);

  if (!isReady)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="animate-spin h-12 w-12" />
      </div>
    );

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/dashboard"} className="gap-2">
                  <ArrowBigLeft />
                  Go back to dashboard
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <ArrowBigRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <div className="flex items-center gap-2">
            {!isDemo && (
              <Button asChild variant={"outline"} className="flex gap-2">
                <Link href="/dashboard">
                  <LayoutDashboard className="w-6 h-6" />
                  Dashboard
                </Link>
              </Button>
            )}

            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {isDemo && (
              <Badge className="py-2">
                This is a demo, you can not save or share the form.
              </Badge>
            )}
            <PreviewDialogButton />

            {isDemo && (
              <SignedOut>
                <Link href="/dashboard">
                  <Button variant={"outline"} className="gap-2">
                    <User className="h-6 w-6" />
                    LogIn
                  </Button>
                </Link>
              </SignedOut>
            )}

            {!form.published && !isDemo && (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};
