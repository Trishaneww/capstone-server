/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
    {
        id: 1,
        user_id:1,
        community_id:1,
    },
    {
        id: 2,
        user_id: 1,
        community_id:2,
    },
    {
        id: 3,
        user_id: 2,
        community_id:3,
    },
    {
        id: 4,
        user_id: 2,
        community_id:6,
    },
    {
        id: 5,
        user_id: 1,
        community_id:6,
    },
    {
        id: 6,
        user_id: 3,
        community_id:6,
    }
];