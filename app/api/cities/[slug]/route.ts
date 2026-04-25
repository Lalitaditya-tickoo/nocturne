import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: city } = await supabase.from("cities").select("*").eq("slug", slug).single();
  if (!city) return NextResponse.json({ error: "not found" }, { status: 404 });

  const { data: venues } = await supabase
    .from("venues")
    .select("*, cities(*)")
    .eq("city_id", city.id)
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("name");

  return NextResponse.json({ city, venues: venues ?? [] });
}