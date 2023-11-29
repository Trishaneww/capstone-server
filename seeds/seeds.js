/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const userData = require('../seeds-data/users');
const deckData = require('../seeds-data/decks');
const flashcardData = require('../seeds-data/flashcards');
const communitiesData = require('../seeds-data/communities')
const commentsData = require('../seeds-data/comments')
const userCommunitiesData = require('../seeds-data/user_communities')
const resultsData = require('../seeds-data/results')

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('decks').del();
  await knex('flashcards').del();
  await knex('communities').del();
  await knex('comments').del();
  await knex('results').del();
  await knex('user_communities').del();
  await knex('users').insert(userData);
  await knex('decks').insert(deckData);
  await knex('flashcards').insert(flashcardData);
  await knex('communities').insert(communitiesData);
  await knex('comments').insert(commentsData);
  await knex('results').insert(resultsData);
  await knex('user_communities').insert(userCommunitiesData);
};