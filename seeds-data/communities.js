/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
    {
        id: 1,
        title: 'UBC CS',
        admin_id: 1,
        faculty: 'Computer Science',
        coursecode: 'CPSC110',
        description: 'UBC cs student community',
        school: "University Of British Columbia"
    },
    {
        id: 2,
        title: 'UOFT LIFE SCI',
        admin_id: 1,
        faculty: 'Biology',
        coursecode: 'HBSc',
        description: 'UofTs life science student community',
        school: "University Of Toronto"
    },
    {
        id: 3,
        title: 'MCMASTER ENG',
        admin_id: 2,
        faculty: 'Engineering',
        coursecode: 'ENG',
        description: 'McMasters eng student community',
        school: "McMaster University"
    },
    {
        id: 4,
        title: 'IVEY Business',
        admin_id: 3,
        faculty: 'Business',
        coursecode: 'ECON',
        description: 'IVEY business student community',
        school: "Western University"
    }
];