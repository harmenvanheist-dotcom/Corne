import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { assistantId } from "@/app/assistant-config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Upload file
    const openaiFile = await openai.files.create({
      file: file,
      purpose: "assistants"
    });

    // Get assistant's vector store
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    let vectorStoreId = assistant.tool_resources?.file_search?.vector_store_ids?.[0];
    
    // Create vector store if it doesn't exist
    if (!vectorStoreId) {
      const vectorStore = await openai.beta.vectorStores.create({
        name: "Assistant Files"
      });
      vectorStoreId = vectorStore.id;
      
      await openai.beta.assistants.update(assistantId, {
        tool_resources: {
          file_search: {
            vector_store_ids: [vectorStoreId]
          }
        }
      });
    }
    
    // Add file to vector store
    await openai.beta.vectorStores.files.create(vectorStoreId, {
      file_id: openaiFile.id
    });

    return NextResponse.json({ fileId: openaiFile.id });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
