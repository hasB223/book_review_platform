/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex.raw(
    `
  insert into review (id, bookId, review)
  values 
  (1, 1, 'This is a review for Book 1.'),
  (2, 1, 'Another review for Book 1.'),
  (3, 3, 'Review for Book 3.'),
  (4, 4, 'Review for Book 4.'),
  (5, 5, 'Review for Book 5.');
  `
  );
};
