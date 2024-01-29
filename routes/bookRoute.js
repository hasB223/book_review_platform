const express = require("express");
const router = express.Router();
const {
  validateBookId,
  validateBookData,
  validateReviewData,
  validateRatingData,
} = require("../middlewares/checkRequest");
const checkBookExists = require("../middlewares/checkBookExists");
const {
  getAllBooks,
  showAddBookPage,
  addBook,
  getBookDetails,
  getBookRating,
  addReview,
  addRating,
  removeBook,
} = require("../controllers/bookControllers");

router.get("/error", function (req, res, next) {
  const error = new Error("Simulated Error");
  error.code = "INPUTS_VALIDATION_ERROR";
  throw error;
});

// Route for fetching all books
router.get("/all", getAllBooks);

// Route to handle the form submission for adding a new book
router.route("/add").get(showAddBookPage).post(validateBookData, addBook);

// Route for serving the favicon
router.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// Apply validateBookId and checkBookExists to all routes with :id parameter
router.use("/:id", validateBookId, checkBookExists);

// Route for fetching details of a specific book
router.get("/:id", getBookDetails);

// Route for fetching details of a specific book
router.get("/:id/getRating", getBookRating);

// Route to handle the form submission for adding a review
router.post("/:id/addReview", validateReviewData, addReview);

// Route to handle the form submission for adding a rating
router.post("/:id/addRating", validateRatingData, addRating);

// Route to handle deleting a book
router.post("/:id/removeBook", removeBook);

// Catch-all route to redirect undefined routes to "/all"
router.use("*", (req, res) => {
  res.redirect("/all");
});

module.exports = router;
