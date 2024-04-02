import { redirect } from "next/navigation";

export async function GET(request: Request) {
  redirect(`${process.env.NEXT_PUBLIC_URL}`);
}
