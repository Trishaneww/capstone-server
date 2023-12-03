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
        description: 'UBCs vast and diverese computer science community',
        school: "University Of British Columbia"
    },
    {
        id: 2,
        title: 'UOFT Life Sci',
        admin_id: 1,
        faculty: 'Biology',
        coursecode: 'HBSc',
        description: 'UofTs life science student community',
        school: "University Of Toronto"
    },
    {
        id: 3,
        title: 'Mmaster Eng',
        admin_id: 2,
        faculty: 'Engineering',
        coursecode: 'ENG',
        description: 'McMasters freshman engineering student community',
        school: "McMaster University"
    },
    {
        id: 4,
        title: 'Western Ivey',
        admin_id: 3,
        faculty: 'Business',
        coursecode: 'ECON',
        description: 'IVEY business student community',
        school: "Western University"
    },
    {
        id: 5,
        title: 'Harvard Lcats',
        admin_id: 3,
        faculty: 'Law',
        coursecode: 'CRIM110',
        description: 'Harvard law study network for current students',
        school: "Harvard University"
    },
    {
        id: 6,
        title: 'Queens Commerce',
        admin_id: 3,
        faculty: 'Commerce',
        coursecode: 'COM101',
        description: 'Queens commerce alumni portal',
        school: "Queens University"
    },
    {
        id: 7,
        title: 'Laurier BBA',
        admin_id: 2,
        faculty: 'business',
        coursecode: 'BCOM101',
        description: 'Aspiring Laurier business management students',
        school: "Laurier University"
    }
];