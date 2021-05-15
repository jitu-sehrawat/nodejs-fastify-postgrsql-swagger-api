'use strict'

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Healthcheck'],
      description: 'Healthcheck endpoint to check if service is up and running',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timeStamp: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    handler: async (request, reply) => {
      return { status: 'ok', timeStamp: new Date().toISOString() };
    }
  });
}
