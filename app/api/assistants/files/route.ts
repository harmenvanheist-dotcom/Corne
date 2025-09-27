import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/app/openai";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Upload file to OpenAI
    const openaiFile = await openai.files.create({
      file: file,
      purpose: "assistants"
    });

    return NextResponse.json({ fileId: openaiFile.id });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
