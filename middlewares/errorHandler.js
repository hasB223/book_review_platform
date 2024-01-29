// Define error messages for different error codes
const errorMessages = {
  // MySQL Server Errors
  ER_NO_SUCH_TABLE: {
    message: "Table not found",
    status: 404,
  },
  ER_DUP_ENTRY: {
    message: "Duplicate entry for key",
    status: 400,
  },
  ER_BAD_FIELD_ERROR: {
    message: "Unknown column in the field list",
    status: 400,
  },
  ER_PARSE_ERROR: {
    message: "Parse error in SQL statement",
    status: 400,
  },
  ER_BAD_DB_ERROR: {
    message: "Unknown database",
    status: 404,
  },
  ER_ACCESS_DENIED_ERROR: {
    message: "Access denied for user",
    status: 403,
  },
  ER_TABLE_EXISTS_ERROR: {
    message: "Table already exists",
    status: 400,
  },
  ER_DATA_TOO_LONG: {
    message: "Data too long for column",
    status: 400,
  },
  ER_LOCK_WAIT_TIMEOUT: {
    message: "Lock wait timeout exceeded",
    status: 503,
  },
  ER_FOREIGN_KEY_CONSTRAINT: {
    message: "Cannot delete or update a parent row",
    status: 400,
  },

  // Custom Errors
  SHOW_ADD_BOOK_PAGE_ERROR: {
    message: "Error while rendering the 'Add Book' page",
  },
  GET_ALL_BOOKS_ERROR: {
    message: "Error while retrieving book reviews",
  },
  GET_BOOK_DETAILS_ERROR: {
    message: "Error retrieving book details",
  },
  GET_BOOK_RATING_ERROR: {
    message: "Error retrieving book ratings",
  },
  ADD_BOOK_ERROR: {
    message: "Error adding book to database",
  },
  ADD_REVIEW_ERROR: {
    message: "Error adding review to database",
  },
  ADD_RATING_ERROR: {
    message: "Error adding rating to database",
  },
  REMOVE_BOOK_ERROR: {
    message: "Error removing book from database",
  },
  INPUTS_VALIDATION_ERROR: {
    message: "Error occurred during inputs validation",
  },
  CHECK_BOOK_EXISTS_ERROR: {
    message: "Error occurred during checking for book existence",
  },
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = 500; // Default status code
  let message = "Internal Server Error"; // Default error message

  // Check if the error object has a code property
  if (err.code) {
    // Look up the error message based on the error code
    const errorInfo = errorMessages[err.code] || {};
    message = errorInfo.message || message;
    statusCode = errorInfo.status || statusCode;
  }
  // Log the error and send an error response to the client
  console.log(err);
  res.status(statusCode).render("displayError", { message, statusCode });
};

module.exports = errorHandler;
