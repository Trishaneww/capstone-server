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
        table.boolean('isFavourite').defaultTo(false);
        table.string('description').notNullable();
        table.string('faculty').notNullable();
        table.string('coursecode').notNullable();
        table.string('school').notNullable();
        table.string('status').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })
      .createTable('results', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('deck_id').notNullable();
        table.string('title').notNullable();
        table.string('type').notNullable();
        table.string('percent').notNullable();
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
      })
      .createTable('communities', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('faculty').notNullable();
        table.string('coursecode').notNullable();
        table.string('school').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })
      .createTable('comments', (table) => {
        table.increments('id').primary();
        table
          .integer('community_id')
          .unsigned()
          .references('communities.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('author').notNullable();
        table.string('message').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      })
      .createTable('user_communities', (table) => {
        table.increments('id').primary()
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
        table
          .integer('community_id')
          .unsigned()
          .references('id')
          .inTable('communities')
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */


  exports.down = function (knex) {
    return knex.schema.dropTable('user_communities').dropTable('comments').dropTable('communities').dropTable('flashcards').dropTable('results').dropTable('decks').dropTable('users');
  };

