"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader, Plus, WandSparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useParams, usePathname } from "next/navigation";
import { generateDemoForm, generateForm } from "@/actions/form-actions";

const formSchema = z.object({
  description: z.string().min(2).max(200),
});

export const AiButton = () => {
  const pathname = usePathname();
  const isDemo = pathname === "/demo";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isDemo) {
        setLoading(true);
        await generateDemoForm(
          "660fde584e2e12f6cd7164c3",
          values.description
        ).then(() => {
          setLoading(false);
          setOpen(false);
        });
      } else {
        setLoading(true);
        await generateForm(id, values.description).then(() => {
          setLoading(false);
          setOpen(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <WandSparkles className="w-4 h-4 mr-2" />
        Generate Form with AI
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ✨"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <Button type="submit" className="w-full" disabled>
                <Loader className="animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
