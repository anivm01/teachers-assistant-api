const bcrypt = require("bcrypt");

const hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const usersData = [
  {
    id: 1,
    name: "Kat",
    email: "kat@example.com",
    password: hashedPassword("password")
  },
  {
    id: 2,
    name: "Victor",
    email: "victor@example.com",
    password: hashedPassword("password")
  }
];

const pdfData = [
  {
    user_id: 1,
    file_name: "Cards 1",
    file_link: "/uploads/cards1.pdf"
  },
  {
    user_id: 1,
    file_name: "Cards 2",
    file_link: "/uploads/cards2.pdf"
  },
  {
    user_id: 2,
    file_name: "Lesson 1",
    file_link: "/uploads/lesson1.pdf"
  },
  {
    user_id: 2,
    file_name: "Lesson 2",
    file_link: "/uploads/lesson2.pdf"
  },
  {
    user_id: 1,
    file_name: "Writing Practice",
    file_link: "/uploads/writing-practice.pdf"
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
