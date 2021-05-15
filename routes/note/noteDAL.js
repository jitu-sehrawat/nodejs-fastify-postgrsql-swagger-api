const NoteDAL = (db) => {
  const createNote = async (title, body) => {
    const { id } = await db.one('INSERT INTO notes (title, body) VALUES($1, $2) RETURNING id', [title, body]);

    return { id, title, body };
  };

  const getNotes = async () => {
    const notes = await db.manyOrNone('SELECT * FROM notes');

    return notes;
  }

  const updateNote = async (noteId, title, body) => {
    const { id } = await db.one(`UPDATE notes SET title=$1, body=$2 WHERE id=$3 RETURNING id`, [title, body, noteId]);

    return { id, title, body };
  }

  const deleteNote = async (id) => {
    return await db.query('DELETE FROM notes WHERE id=$1', [id]);
  }

  return { createNote, getNotes, updateNote, deleteNote };
}

module.exports = NoteDAL;