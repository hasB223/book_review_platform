/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex.raw(
    `
  insert into rating (id, bookId, rating)
  values 
  (1 ,1, 4),
  (2 ,1, 5),
  (3 ,2, 3),
  (4 ,3, 4),
  (5 ,5, 5);
  
  `
  );
};
