import express from 'express';

import * as NoteController from '../controllers/note.controllers';

export const noteRouter = express.Router();

noteRouter.post('/create', NoteController.createNote);
noteRouter.delete('/:noteId', NoteController.deleteNote);
noteRouter.put('/:noteId', NoteController.updateNote);
noteRouter.get('/all', NoteController.getAllNotes);
noteRouter.get('/:noteId', NoteController.getNote);
