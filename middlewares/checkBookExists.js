const bookModel = require("../models/bookModel");
const { getAllBooks } = require("../controllers/bookControllers");

//@desc middleware to check if book with ID exist before passing it to other controller
//@route GET & POST /:id
const checkBookExists = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const bookExists = await bookModel.checkBookExists(bookId);
    if (!bookExists) {
      const errorMessages = ["Book not found"];
      req.errors = errorMessages;
      return getAllBooks(req, res);
    }
    next(); // Move to the next middleware/controller action
  } catch (error) {
    next({
      error: error,
      code: "CHECK_BOOK_EXISTS_ERROR",
    });
  }
};

module.exports = checkBookExists;
