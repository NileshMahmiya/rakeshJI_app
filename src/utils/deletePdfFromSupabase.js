import supabase from "../config/supabase.js";

const deletePdfFromSupabase = async (
  filePath
) => {

  if (!filePath) {
    return;
  }


  try {

    const { error } =
      await supabase.storage

        .from("books")

        .remove([
          filePath
        ]);


    if (error) {

      console.error(
        "Supabase PDF Delete Error:",
        error.message
      );

      return;
    }


    console.log(
      "PDF deleted from Supabase:",
      filePath
    );


  } catch (error) {

    console.error(
      "Supabase PDF Delete Error:",
      error.message
    );
  }
};


export default deletePdfFromSupabase;