const usersData = [
  {
    id: 1,
    name: "Kat",
    email: "kat@example.com",
    password: "password",
  },
  {
    id: 2,
    name: "Victor",
    email: "victor@example.com",
    password: "password"
  }
];

const pdfData = [
  {
    user_id: 1,
    file_name: "Cards 1",
    file_link: "http://localhost/uploads/cards1.pdf"
  },
  {
    user_id: 1,
    file_name: "Cards 2",
    file_link: "http://localhost/uploads/cards2.pdf"
  },
  {
    user_id: 2,
    file_name: "Lesson 1",
    file_link: "http://localhost/uploads/lesson1.pdf"
  },
  {
    user_id: 2,
    file_name: "Lesson 2",
    file_link: "http://localhost/uploads/lesson2.pdf"
  },
  {
    user_id: 1,
    file_name: "Writing Practice",
    file_link: "http://localhost/uploads/writing-practice.pdf"
  }
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  await knex('user').insert(usersData);
  await knex('pdf').del();
  await knex('pdf').insert(pdfData);
};
