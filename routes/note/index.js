'use strict';

const { noteSchema } = require('./schemas');
const NoteDAL = require('./noteDAL');

module.exports = async function (fastify, opts) {
  // fastify.register(noteDALPlugin);
  const noteDAL = NoteDAL(fastify.db);

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Note'],
      description: 'Get all notes',
      response: {
        200: {
          type: 'array',
          items: noteSchema
        }
      }
    },
    handler: async (request, reply) => {
      return await noteDAL.getNotes();
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Note'],
      description: 'Create a notes',
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string', description: 'main content of the note' }
        }
      },
      response: {
        200: noteSchema
      }
    },
    handler: async (request, reply) => {
      const { title, body } = request.body;
      const newNote = await noteDAL.createNote(title, body);
      
      return newNote;
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Note'],
      description: 'Update a note by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string', description: 'main content of the note' }
        }
      },
      response: {
        200: noteSchema
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { title, body } = request.body;

      const updatedNote = await noteDAL.updateNote(id, title, body);
      return updatedNote;
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['Note'],
      description: 'Delete a note by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        204: {
          type: 'object',
          default: 'No Content'
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      await noteDAL.deleteNote(id);
      reply.status(204);
    }
  });

};
