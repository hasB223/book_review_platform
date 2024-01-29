const knex = require("knex");
const config = require("../knexfile");
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

const bookModel = {
  //@desc Retrieve all book from database
  //@route GET /all
  selectAllBooks: async (sort = "id", order = "asc") => {
    try {
      if (order !== "asc" && order !== "desc") {
        throw new Error("Invalid order parameter");
      }
      // Build a query to retrieve all books and sort them by the specified column
      let query = connection("book");

      // Default: sort (sort by)= 'id', order = "asc"
      // if user click `Ascending`: sort = 'name', order = "asc"
      // if user click `Descending`: sort = 'name', order = "desc"
      query = query.orderBy(sort, order);

      const result = await query;
      return result;
    } catch (error) {
      next(error);
    }
  },

  //@desc middleware to check if book with ID exist before passing it to other controller, give boolean value
  //@route GET & POST /:id
  checkBookExists: async (bookId) => {
    try {
      // Check if a book with the given ID exists
      const result = await connection("book")
        .where("id", bookId)
        .select("id")
        .first();
      // Return true if a book with the given ID exists, otherwise false
      return !!result;
    } catch (error) {
      next(error);
    }
  },

  //@desc Retrieve a book from database
  //@route GET /:id
  selectBookById: async (bookId) => {
    try {
      // Fetch data for the book and reviews
      const [book, reviews] = await Promise.all([
        connection.raw("SELECT * FROM book WHERE id = ?", [bookId]),
        connection.raw("SELECT * FROM review WHERE bookId = ?", [bookId]),
      ]);

      // Extract data from the query results
      const selectedBook = book[0][0];
      const bookReviews = reviews[0];

      // Fetch average rating and total ratings using selectRatingById function
      const bookRatings = await bookModel.selectRatingById(bookId);

      // Combine book details, rating, and reviews
      return {
        selectedBook,
        bookRatings: bookRatings,
        bookReviews,
      };
    } catch (error) {
      next(error);
    }
  },

  //@desc Retrieve rating of a book from database
  //@route GET /:id/getRating
  selectRatingById: async (bookId) => {
    try {
      const result = await connection.raw(
        `
          SELECT 
              AVG(rating) as averageRating,
              COUNT(rating) as totalRatings
          FROM rating
          WHERE bookId = ?
      `,
        [bookId]
      );

      return result[0][0];
    } catch (error) {
      next(error);
    }
  },

  //@desc Add a book to database
  //@route POST /add
  insertBook: async (bookData) => {
    try {
      await connection("book").insert(bookData);
    } catch (error) {
      next(error);
    }
  },

  //@desc Add a review of a book to database
  //@route POST /:id/addReview
  insertReview: async (reviewData) => {
    try {
      await connection("review").insert(reviewData);
    } catch (error) {
      next(error);
    }
  },

  //@desc Add a rating of a book to database
  //@route POST /:id/addRating
  insertRating: async (ratingData) => {
    try {
      await connection("rating").insert(ratingData);
    } catch (error) {
      next(error);
    }
  },

  //@desc Remove a book from database
  //@route POST /:id/removeBook
  deleteBookById: async (bookId) => {
    try {
      await connection("book").where("id", bookId).del();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bookModel;
