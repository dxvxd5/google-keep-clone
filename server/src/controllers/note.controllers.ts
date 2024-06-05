import { Request, Response } from 'express';
import { Note } from '../models/note.model';

export const createNote = async (req: Request, res: Response) => {
  const { author, title, content, creationDate } = req.body;

  try {
    if (!(author && title && creationDate)) {
      // we allow creating a note without providing the content initially
      res.status(404).json({
        error: 'Specify author, title and creation date',
      });
      return;
    }
    const newNote = await Note.createNote(author, title, content, creationDate);
    res.status(200).json(buildJsonResponse(newNote, 'note'));
  } catch (e) {
    res.status(500).send('Internal server error, ' + (e as Error).message);
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
      res.status(400).send(`note ${noteId} does not exist.`);
    }
  } catch (e) {
    res.status(500).send('Internal server error.' + (e as Error).message);
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { content, title, lastUpdated } = req.body;
  if (lastUpdated == null) {
    res.status(404).send('you must specify the update date');
    return;
  }

  //remove nullable field

  let fieldToEdit = Object.fromEntries(
    Object.entries({ content, title }).filter(([_, v]) => v != null),
  );

  try {
    const isUpdated = await Note.updateNote(noteId, {
      ...fieldToEdit,
      lastUpdated,
    });
    if (isUpdated) {
      res.status(200).send('Note updated successfully');
    } else {
      res.status(404).send('Note not found');
    }
  } catch (e) {
    res.status(500).send('Internal server error, ' + (e as Error).message);
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
  } catch (e) {
    res.status(500).send('Internal server error, ' + (e as Error).message);
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
  } catch (e) {
    return res
      .status(500)
      .send('Internal server error, ' + (e as Error).message);
  }
};
