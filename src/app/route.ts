import algorithms from "@/lib/algorithms";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  redirect(`/algorithm/${algorithms["binaryTree"]["slug"]}`);
}
