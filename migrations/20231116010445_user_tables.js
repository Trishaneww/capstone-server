/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.boolean('isAdmin').defaultTo(false);
      table.integer('activity').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('decks', (table) => {
        table.increments('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .references('users.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('category').notNullable();
        table.string('status').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })
      .createTable('flashcards', (table) => {
        table.increments('id').primary();
        table
          .integer('deck_id')
          .unsigned()
          .references('decks.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('question').notNullable();
        table.string('answer').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('flashcards').dropTable('decks').dropTable('users');
  };
