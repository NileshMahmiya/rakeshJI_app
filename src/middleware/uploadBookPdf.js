import multer from "multer";


// =====================================================
// MEMORY STORAGE
// =====================================================

const storage =
  multer.memoryStorage();


// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (
  req,
  file,
  cb
) => {

  console.log(
    "File received:"
  );

  console.log(
    "Field:",
    file.fieldname
  );

  console.log(
    "Original name:",
    file.originalname
  );

  console.log(
    "Mimetype:",
    file.mimetype
  );


  // Only bookPdf field
  if (
    file.fieldname !== "bookPdf"
  ) {

    return cb(
      new Error(
        "Only bookPdf field is allowed"
      )
    );
  }


  // Normal PDF
  if (
    file.mimetype ===
    "application/pdf"
  ) {

    return cb(
      null,
      true
    );
  }


  // Some clients send PDF as
  // application/octet-stream
  if (
    file.mimetype ===
    "application/octet-stream"
  ) {

    const isPdf =
      file.originalname
        .toLowerCase()
        .endsWith(".pdf");


    if (isPdf) {

      return cb(
        null,
        true
      );
    }
  }


  return cb(
    new Error(
      "Only PDF files are allowed"
    )
  );
};


// =====================================================
// MULTER
// =====================================================

const uploadBookPdf =
  multer({

    storage,

    fileFilter,

    limits: {
      fileSize:
        20 * 1024 * 1024,
    },

  });


export default uploadBookPdf;