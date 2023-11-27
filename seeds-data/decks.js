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
        isFavourite: false,
        category: 'Computer Science',
        status: 'public'
    },
    {
        id: 2,
        user_id: 2,
        title: 'BIO110',
        isFavourite: false,
        description: 'BIO110 final exam',
        category: 'Science',
        status: 'public'
    },
    {
        id: 3,
        user_id: 3,
        title: 'MATH100',
        isFavourite: false,
        description: 'MATH100 study notes',
        category: 'Math',
        status: 'public'
    }
];