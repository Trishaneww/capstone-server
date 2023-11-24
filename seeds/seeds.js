/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const userData = require('../seeds-data/users');
const deckData = require('../seeds-data/decks');
const flashcardData = require('../seeds-data/flashcards');

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('decks').del();
  await knex('flashcards').del();
  await knex('users').insert(userData);
  await knex('decks').insert(deckData);
  await knex('flashcards').insert(flashcardData);
};