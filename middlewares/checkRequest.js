const { param, body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const {
  getAllBooks,
  getBookDetails,
  showAddBookPage,
} = require("../controllers/bookControllers");

// Middleware function to handle input validation and redirection on errors
function redirectIfErrors(validationChain, errorRedirect) {
  return [
    ...validationChain,
    async (req, res, next) => {
      try {
        // Sanitize and validate input
        const errors = validationResult(req);

        // Check if there are validation errors
        if (!errors.isEmpty()) {
          console.log("Validation errors:", errors.array());
          // Store error messages in the request object
          req.errors = errors.array().map((error) => error.msg);
        } else {
          // Check for empty fields in the request body
          const emptyFields = Object.keys(req.body).filter(
            (field) => !req.body[field]
          );

          // If there are empty fields, add corresponding error messages
          if (emptyFields.length > 0) {
            console.log("Empty fields detected:", emptyFields);
            req.errors = [
              ...(req.errors || []),
              ...emptyFields.map((field) => `${field} is required`),
            ];
          }
        }

        // If there are errors, redirect to the error page
        if (req.errors && req.errors.length > 0) {
          return errorRedirect(req, res); // Send an error response to the client
        }
        next(); // Continue if validation passed
      } catch (error) {
        // If an error occurs during validation, pass it to the error handler
        next({
          error: error,
          code: "INPUTS_VALIDATION_ERROR",
        });
      }
    },
  ];
}

// validate all route with `/:id`, i.e. localhost:4000/:id
const validateBookId = redirectIfErrors(
  [
    param("id")
      .trim()
      .notEmpty()
      .isInt()
      .toInt()
      .withMessage("Invalid book ID"),
  ],
  getAllBooks
);

//@desc Add a book to database
//@route POST /add
const sanitizeBookData = [
  body("book_title").customSanitizer((value) => sanitizeHtml(value)),
  body("book_author").customSanitizer((value) => sanitizeHtml(value)),
  body("book_cover").customSanitizer((value) => sanitizeHtml(value)),
  body("book_description").customSanitizer((value) => sanitizeHtml(value)),
];

const validateBookData = redirectIfErrors(
  [
    ...sanitizeBookData,
    body("book_title")
      .trim()
      .notEmpty()
      .withMessage("Book Title is required")
      .isLength({ max: 45 })
      .withMessage("Book name is too long (maximum 45 characters)"),
    body("book_author")
      .trim()
      .notEmpty()
      .withMessage("Book Author is required")
      .isLength({ max: 45 })
      .withMessage("Book author is too long (maximum 45 characters)"),
    body("book_cover")
      .trim()
      .notEmpty()
      .withMessage("Book Image Link is required")
      .isURL()
      .withMessage("Invalid Link (URL) format")
      .isLength({ max: 255 })
      .withMessage("Book Image Link is too long (maximum 255 characters)"),
    body("book_description")
      .trim()
      .notEmpty()
      .withMessage("Book Description is required")
      .isLength({ max: 12000 })
      .withMessage("Description is too long (maximum 12000 characters)"),
  ],
  showAddBookPage
);

//@desc Add a review of a book to database
//@route POST /:id/addReview
const sanitizeReviewData = [
  body("review").customSanitizer((value) => sanitizeHtml(value)),
];

const validateReviewData = redirectIfErrors(
  [
    ...sanitizeReviewData,
    body("review")
      .trim()
      .notEmpty()
      .withMessage("Review is required before posting")
      .isLength({ max: 12000 })
      .withMessage("Review is too long (maximum 12000 characters)"),
  ],
  (req, res) => {
    const bookId = req.params.id;
    req.params.id = bookId;
    return getBookDetails(req, res);
  }
);

//@desc Add a rating of a book to database
//@route POST /:id/addRating
const sanitizeRatingData = [
  body("rating").toInt(), // Convert rating to integer
];

const validateRatingData = redirectIfErrors(
  [
    ...sanitizeRatingData,
    body("rating")
      .trim()
      .notEmpty()
      .withMessage("Rating is required")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  (req, res) => {
    const bookId = req.params.id;
    req.params.id = bookId;
    return getBookDetails(req, res);
  }
);

module.exports = {
  validateBookId,
  validateBookData,
  validateReviewData,
  validateRatingData,
};
