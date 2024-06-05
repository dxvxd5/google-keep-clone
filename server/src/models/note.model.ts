import { firestore, geNotePath, NOTES_BASE_PATH } from '../config/firebase';

interface NoteData {
  readonly id: string;
  author: string;
  title: string;
  content: string;
  creationDate: number;
  lastUpdated: number;
}
interface EditableNoteField {
  title?: string;
  content?: string;
  lastUpdated: number;
}

export class Note {
  readonly id: string;
  author: string;
  title: string;
  content: string;
  creationDate: number;
  lastUpdated: number;

  private static isNoteData = (data: any): data is NoteData => {
    if (!data || typeof data !== 'object') {
      return false;
    }

    if (
      ['id', 'title', 'content', 'author'].some(
        (attr) => !(attr in data && typeof data[attr] === 'string'),
      )
    ) {
      return false;
    }

    if (
      ['creationDate', 'lastUpdated'].some(
        (attr) => !(attr in data && typeof Number.isFinite(data[attr])),
      )
    ) {
      return false;
    }

    return true;
  };
  static async createNote(
    author: string,
    title: string,
    content: string,
    creationDate: number,
  ): Promise<Note | null> {
    const newNote = await firestore.collection(NOTES_BASE_PATH).add({
      author,
      title,
      content,
      creationDate,
      lastUpdated: creationDate,
    });

    return new Note({
      author,
      title,
      content,
      creationDate,
      lastUpdated: creationDate,
      id: newNote.id,
    });
  }

  private static createNoteFromData(data: unknown): Note | null {
    if (!Note.isNoteData(data)) {
      return null;
    }

    return new Note({ ...data });
  }

  static async deleteNoteFromId(noteId: string) {
    const note = await firestore.doc(geNotePath(noteId)).get();
    if (note.exists) {
      await note.ref.delete();
      return true;
    }
    return false;
  }

  static async updateNote(
    noteId: string,
    filedToEdit: EditableNoteField,
  ): Promise<boolean> {
    const note = await firestore.doc(geNotePath(noteId)).get();
    if (note.exists) {
      await note.ref.update({ ...filedToEdit });
      return true;
    } else {
      return false;
    }
  }

  static async getNoteFromId(noteId: string) {
    const dataRef = await firestore.doc(geNotePath(noteId)).get();
    const data = dataRef.data();

    if (!data) return null;

    const note = this.createNoteFromData({ ...data, id: dataRef.id });

    if (!note) {
      throw new Error(`Incorrect data for noteId:${noteId}`);
    }

    return note;
  }

  static async getAllNotes() {
    const snapshot = await firestore.collection(NOTES_BASE_PATH).get();

    if (snapshot.empty) {
      return [];
    }

    let notes: Note[] = [];

    snapshot.forEach((doc) => {
      let note = Note.createNoteFromData({ ...doc.data(), id: doc.id });

      if (!note) {
        throw new Error(`Incorrect data for noteId:${doc.id}`);
      }

      notes.push(note);
    });

    return notes;
  }

  constructor({
    author,
    content,
    creationDate,
    id,
    lastUpdated,
    title,
  }: NoteData) {
    this.author = author;
    this.content = content;
    this.creationDate = creationDate;
    this.id = id;
    this.lastUpdated = lastUpdated;
    this.title = title;
  }
}
