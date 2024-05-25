import styled from 'styled-components';
import { NoteData } from '../types';
import { Note } from './Note';

interface NoteListProp {
  notes: NoteData[];
}

const NoteListContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const NoteList = ({ notes }: NoteListProp) => {
  return (
    <NoteListContainer>
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </NoteListContainer>
  );
};
