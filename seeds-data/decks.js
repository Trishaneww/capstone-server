/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
    {
        id: 1,
        user_id: 2,
        title: 'CPSC110 Exam',
        coursecode: 'CPSC110',
        description: 'study deck for CPSC1110 midterm',
        isFavourite: false,
        faculty: 'Computer Science',
        school: "University Of British Columbia",
        status: 'public'
    },
    {
        id: 2,
        user_id: 2,
        title: 'BIO110 quiz',
        coursecode: 'HBSc',
        isFavourite: false,
        description: 'BIO110 final exam',
        faculty: 'Science',
        school: "University Of Toronto",
        status: 'public'
    },
    {
        id: 3,
        user_id: 3,
        title: 'MATH100 final',
        coursecode: 'MATH100',
        isFavourite: false,
        description: 'MATH100 study notes',
        faculty: 'Math',
        school: "McMaster University",
        status: 'public'
    }
];