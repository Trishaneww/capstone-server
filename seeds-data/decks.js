/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
    {
        id: 1,
        user_id: 2,
        title: 'CPSC110',
        description: 'study deck for CPSC1110 midterm',
        category: 'Computer Science',
        status: 'hidden'
    },
    {
        id: 2,
        user_id: 2,
        title: 'BIO110',
        description: 'BIO110 final exam',
        category: 'Science',
        status: 'hidden'
    },
    {
        id: 3,
        user_id: 3,
        title: 'MATH100',
        description: 'MATH100 study notes',
        category: 'Math',
        status: 'public'
    }
];