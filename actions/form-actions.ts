"use server";

import { prismadb } from "@/lib/prismdb";
import { formSchema, formSchemaType } from "@/schemas/form";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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
