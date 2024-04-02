/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { logInSchema } from "@/schema/authSchema";

export default function Page() {
  const router = useRouter();
  const path = usePathname();
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const gg = async (email: string, password: string) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    const result: any = await signIn("credentials", {
      redirect: false, // Set to false to handle redirect manually
      email,
      password,
    });
    // Check if sign-in was successful
    if (result.error) {
      // Handle sign-in error (display error message, etc.)
      // console.log(result.error);
      // toast.error(result.error);
      throw new Error(result.error);
    } else {
      // Sign-in was successful, handle redirect or other actions
      router.push("/");
    }
    return result;
  };

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof logInSchema>) {
    const { email, password } = data;

    // Define a minimum delay of 0.8 seconds (2000 milliseconds)
    const minimumDelay = 800;

    // Delay the execution of gg function
    await new Promise((resolve) => {
      setTimeout(resolve, minimumDelay);
    });

    // Trigger the sign-in process
    const fg: any = gg(email, password);

    toast.promise(
      fg
        .then((result: any) => {
          // Handle success

          return result; // Pass the result to the success callback
        })
        .catch((error: any) => {
          // Handle error and get the error message
          console.error(error.message);
          return Promise.reject(error); // Pass the error to the error callback
        }),
      {
        loading: "Logging you in...",
        error: (error) => {
          // Display the error message using toast.error
          // toast.error(error.message);
          return error.message; // Return the error message
        },
        success: "Logged In Successfully....",
      }
    );
  }
  const login = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: process.env.NEXT_PUBLIC_URL,
      });
      toast.loading("Logging in...!");
    } catch (error: any) {
      // Handle errors, possibly by displaying an error message using toast.error() or other means
      toast.error(`Error: ${error.message}`);
    }
  };
  return (
    <div className="w-full">
      <p className="text-2xl mb-0.5 font-medium">Log in.</p>
      <p className="text-4xl font-semibold mb-6">Welcome Back!</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormMessage className="text-right" />
                <FormLabel>Email</FormLabel>
                <FormControl className="focus-within:border-primary">
                  <Input
                    placeholder="Please enter your email address..."
                    className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormMessage className="text-right" />
                <FormLabel>Password</FormLabel>
                <FormControl className="focus-within:border-primary">
                  <Input
                    placeholder="Please enter your password..."
                    className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex pb-2 justify-end items-center text-sm text-muted-foreground font-medium">
            <Link href={"/auth/forgot-password"}>Forgot Password?</Link>
          </div>
          <Button
            type="submit"
            size={"default"}
            className="w-full h-12 text-lg"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="flex items-center my-16">
        <hr className="w-full" />
        <p className="min-w-max mx-2 font-medium text-muted-foreground">
          Or Login with
        </p>
        <hr className="w-full" />
      </div>
      <div className="flex items-center justify-between gap-3 mt-4">
        <Button
          className="gap-3 w-full text-lg font-medium text-blue-500"
          variant={"outline"}
          size={"lg"}
        >
          <FaFacebookF />
        </Button>
        <Button
          className="gap-3 w-full text-lg font-medium"
          variant={"outline"}
          size={"lg"}
          onClick={() => login("google")}
        >
          <FcGoogle />
        </Button>
        <Button
          className="gap-3 w-full text-lg font-medium"
          variant={"outline"}
          size={"lg"}
        >
          <FaApple />
        </Button>
      </div>
      <div className="mt-6 w-full flex items-center justify-center">
        <p className="text-center text-base text-muted-foreground font-medium">
          Don't have an account?{" "}
          <Link href={"/auth/sign-up"} className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
