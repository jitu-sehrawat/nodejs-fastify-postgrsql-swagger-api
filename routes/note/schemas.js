const noteSchema = {
  type: 'object',
  required: ['id', 'title', 'body'],
  properties: {
    id: {
      type: 'number',
      description: 'unique identifier for each note'
    },
    title: { type: 'string' },
    body: { type: 'string', description: 'main content of the note' }
  }
};

module.exports = {
  noteSchema
}