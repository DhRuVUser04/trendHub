"use server";

import { prisma } from "@/lib/prisma/prisma";
import { signUpSchema } from "@/schema/authSchema";
import { checkRateLimit } from "@/utils/ratelimit";
import bcrypt from "bcryptjs";

type signUpProps = {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};

export const signUpAction = async ({ formData }: signUpProps) => {
  checkRateLimit();
  let data;
  try {
    const response: signUpSchema = signUpSchema.parse(formData);
    data = response;
  } catch (error: any) {
    return {
      error: "Validation error: " + error.message,
      success: false,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    return {
      error: "User already exists",
      success: false,
    };
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      authProvider: "credentials",
    },
  });

  return {
    message: "User created successfully",
    success: true,
  };
};
