import { Request, Response } from 'express';
import { Note } from '../models/note.model';

export const createNote = async (req: Request, res: Response) => {
  const { author, title, content, creationDate } = req.body;

  try {
    if (!(author && creationDate)) {
      // we allow creating a note without providing the content initially
      const errorMessage = [
        ['author', author],
        ['creationDate', creationDate],
      ]
        .filter((field) => !field[1])
        .map((field) => field[0])
        .join(', ');

      res.status(404).json({
        error: `You need to specify ${errorMessage}`,
      });
      return;
    }
    const newNote = await Note.createNote({
      author,
      title,
      content,
      creationDate,
    });
    res.status(200).json(buildJsonResponse(newNote, 'note'));
  } catch {
    res.status(500).send('Internal server error.');
  }
};

const buildJsonResponse = (data: unknown, key: string) => {
  return {
    data: {
      [key]: data,
    },
  };
};

export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  try {
    const isDeleted = await Note.deleteNoteFromId(noteId);
    if (isDeleted) {
      res.status(200).send(`note ${noteId} was succesfully deleted`);
    } else {
      res.status(404).json({
        error: `note ${noteId} does not exist.`,
      });
    }
  } catch {
    res.status(500).send('Internal server error.');
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { content, title, lastUpdated } = req.body;
  if (!lastUpdated) {
    res.status(404).send('you must specify the update date');
    return;
  }

  //remove nullable field

  let fieldToEdit = Object.fromEntries(
    Object.entries({ content, title }).filter(
      ([_, v]) => v !== null && v !== undefined,
    ),
  );

  try {
    const updatedNote = await Note.updateNote(noteId, {
      ...fieldToEdit,
      lastUpdated,
    });
    if (updatedNote) {
      res.status(200).send(buildJsonResponse(updatedNote, 'note'));
    } else {
      res.status(404).json({
        error: 'The specified note does not exist',
      });
    }
  } catch {
    res.status(500).send('Internal server error');
  }
};

export const getNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;

  try {
    const note = await Note.getNoteFromId(noteId);

    if (!note) {
      return res.status(404).json({
        error: 'The specified note does not exist',
      });
    }
    return res.status(200).json(buildJsonResponse(note, 'note'));
  } catch {
    res.status(500).send('Internal server error');
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.getAllNotes();

    if (!notes) {
      return res.status(404).json({
        error: 'Error occurs when looking for the notes',
      });
    }

    return res.status(200).json(buildJsonResponse(notes, 'notes'));
  } catch {
    return res.status(500).send('Internal server error');
  }
};
