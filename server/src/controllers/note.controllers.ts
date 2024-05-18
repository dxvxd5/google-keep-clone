import { Request, Response } from 'express';
import { Note } from '../models/note.model';

export const createNote = async (req: Request, res: Response) => {
  res.send('creating a note.' + JSON.stringify(req.body));
  console.log(req.body.content);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  res.send(`deleting the note  ${noteId}`);
};

export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  res.send(`update this note  ${noteId}`);
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
    return res.status(200).json(note);
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

    return res.status(200).json(notes);
  } catch {
    return res.status(500).send('Internal server error');
  }
};
