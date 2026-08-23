import supabase from "../config/supabase.js";
import path from "path";

const uploadPdfToSupabase = async (
  buffer,
  originalName
) => {
  try {

    // Remove extension
    const nameWithoutExtension =
      path.basename(
        originalName,
        path.extname(originalName)
      );


    // Clean filename
    const cleanName =
      nameWithoutExtension
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-");


    // Create unique filename
    const fileName =
      `${Date.now()}-${cleanName}.pdf`;


    // Supabase storage path
    const filePath =
      `pdf/${fileName}`;


    // Upload
    const { error } =
      await supabase.storage

        .from("books")

        .upload(
          filePath,
          buffer,
          {
            contentType:
              "application/pdf",

            upsert: false,
          }
        );


    if (error) {
      throw error;
    }


    // Get public URL
    const { data } =
      supabase.storage

        .from("books")

        .getPublicUrl(
          filePath
        );


    return {
      filePath,
      publicUrl:
        data.publicUrl,
    };


  } catch (error) {

    console.error(
      "Supabase PDF Upload Error:",
      error
    );

    throw error;
  }
};


export default uploadPdfToSupabase;