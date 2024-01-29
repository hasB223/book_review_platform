const bookModel = require("../models/bookModel");

const bookController = {
  //@desc Show `Add Book` page
  //@route GET /add
  showAddBookPage: (req, res, next) => {
    try {
      res.render("addBook", {
        title: "Add a book",
        errors: req.errors || [],
      });
    } catch (error) {
      next({
        error: error,
        code: "SHOW_ADD_BOOK_PAGE_ERROR",
      });
    }
  },

  //@desc Show main page
  //@route GET /all
  getAllBooks: async (req, res, next) => {
    const sort = req.query.sort || "id";
    const order = req.query.order || "asc";

    try {
      const books = await bookModel.selectAllBooks(sort, order);
      res.render("allBooks", {
        title: "Book Reviews",
        books: books,
        errors: req.errors || [],
      });
    } catch (error) {
      next({
        error: error,
        code: "GET_ALL_BOOKS_ERROR",
      });
    }
  },

  //@desc Show `Book Details` page
  //@route GET /:id
  getBookDetails: async (req, res, next) => {
    const bookId = req.params.id;

    try {
      const bookDetails = await bookModel.selectBookById(bookId);
      res.render("bookDetails", {
        title: bookDetails.selectedBook.BookName,
        book: bookDetails.selectedBook,
        ratings: bookDetails.bookRatings,
        reviews: bookDetails.bookReviews,
        errors: req.errors || [],
      });
    } catch (error) {
      next({
        error: error,
        code: "GET_BOOK_DETAILS_ERROR",
      });
    }
  },

  //@desc Retrieve rating of a book
  //@route GET /:id/getRating
  getBookRating: async (req, res, next) => {
    const bookId = req.params.id;

    try {
      const ratingData = await bookModel.selectRatingById(bookId);

      const averageRating = ratingData.averageRating;
      const totalRatings = ratingData.totalRatings;

      res.json({ averageRating, totalRatings });
    } catch (error) {
      next({
        error: error,
        code: "GET_BOOK_RATING_ERROR",
      });
    }
  },

  //@desc Add a book to database
  //@route POST /add
  addBook: async (req, res, next) => {
    try {
      const { book_title, book_author, book_cover, book_description } =
        req.body;
      const bookData = {
        BookName: book_title,
        BookAuthor: book_author,
        BookImage: book_cover,
        Description: book_description,
      };

      await bookModel.insertBook(bookData);
      res.redirect("/all"); // Redirect to the "all" page
    } catch (error) {
      next({
        error: error,
        code: "ADD_BOOK_ERROR",
      });
    }
  },

  //@desc Add a review of a book to database
  //@route POST /:id/addReview
  addReview: async (req, res, next) => {
    try {
      const reviewData = {
        bookId: req.params.id,
        review: req.body.review,
      };
      await bookModel.insertReview(reviewData);
      res.redirect(`/${reviewData.bookId}`); // Redirect back to the book details page
    } catch (error) {
      next({
        error: error,
        code: "ADD_REVIEW_ERROR",
      });
    }
  },

  //@desc Add a rating of a book to database
  //@route POST /:id/addRating
  addRating: async (req, res, next) => {
    try {
      const ratingData = {
        bookId: req.params.id,
        rating: req.body.rating,
      };

      await bookModel.insertRating(ratingData);
      res.redirect(`/${ratingData.bookId}`); // Redirect back to the book details page
    } catch (error) {
      next({
        error: error,
        code: "ADD_RATING_ERROR",
      });
    }
  },

  //@desc Remove a book from database
  //@route POST /:id/removeBook
  //Button used is in a <form> tag. A workaround for DELETE method
  removeBook: async (req, res, next) => {
    try {
      const bookId = req.params.id;
      // Call the model function to delete the book
      await bookModel.deleteBookById(bookId);

      // Redirect to the "all" page
      res.redirect("/all");
    } catch (error) {
      next({
        error: error,
        code: "REMOVE_BOOK_ERROR",
      });
    }
  },
};

module.exports = bookController;
