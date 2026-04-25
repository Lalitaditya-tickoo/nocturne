import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("venues")
    .select("*, cities(*)")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("name")
    .limit(6);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}