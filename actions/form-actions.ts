"use server";

import { prismadb } from "@/lib/prismdb";
import { formSchema, formSchemaType } from "@/schemas/form";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getFormStats = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const stats = await prismadb.form.aggregate({
    where: { userId },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
};

export const createForm = async (data: formSchemaType) => {
  const validation = formSchema.safeParse(data);

  if (!validation) {
    throw new Error("Form not valid");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { name, description } = data;
  const form = await prismadb.form.create({
    data: { userId, name, description },
  });
  if (!form) {
    throw new Error("Something went wrong");
  }

  return form.id;
};

export async function getForms() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await prismadb.form.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFormById(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await prismadb.form.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export const publishForm = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prismadb.form.update({
    data: { published: true },
    where: {
      id,
      userId,
    },
  });

  return revalidatePath("/builder");
};

export const updateFormContent = async (id: string, jsonContent: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prismadb.form.update({
    data: { content: jsonContent },
    where: {
      id,
      userId,
    },
  });

  return revalidatePath("/builder");
};

export async function getFormWithSubmissions(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await prismadb.form.findUnique({
    where: {
      userId,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}

export async function getFormContentByUrl(formUrl: string) {
  return await prismadb.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

export async function submitForm(formUrl: string, content: string) {
  return await prismadb.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

export async function generateForm(id: string | string[], description: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      message: "No OpenAI API key found",
    };
  }

  const promptExplanation =
    "Based on the description, generate a survey object with 3 fields:  id a random number between 1000 and 9999(string) for the form, type: chosen from TextField, NumberField, TextAreaField, CheckboxField, extraAttributes an object with label(string), helperText(string, required(boolean), placeholder:(string), return the response as an array of object, return only the array no other comments. Do not leave any space or use any special character. You answer need to be parsed as json object";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${description} ${promptExplanation}`,
          },
        ],
      }),
    });
    const json = await response.json();

    const responseObj = json.choices[0].message.content;

    updateFormContent(id, responseObj);
    revalidatePath(`/builder/${id}`);
    return {
      message: "success",
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to create form",
    };
  }
}
