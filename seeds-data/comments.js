/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
    {
        id: 1,
        community_id: 1,
        author: 'Mark sanadi',
        message: 'How was the latest exam?',
    },
    {
        id: 2,
        community_id: 1,
        author: 'Mark sanadi',
        message: 'How was last weeks homework?',
        
    },
    {
        id: 3,
        community_id: 2,
        author: 'Mark sanadi',
        message: 'Hows class been?!',
    },
    {
        id: 4,
        community_id: 2,
        author: 'John Hynds',
        message: 'Its been great',
    }
];