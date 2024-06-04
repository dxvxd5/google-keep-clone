import styled from 'styled-components';
import { NoteData } from '../types';

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;

  font-family: 'Noto Sans';
  width: 25%;
  max-height: 250px;

  padding: 20px 15px;

  background-color: #202124;
  color: white;
  border: 1px solid #5f6368;
  border-radius: 8px;
`;

const NoteTitle = styled.div`
  font-weight: 500;
`;

const NoteContent = styled.div`
  font-weight: 400;
  letter-spacing: 0;
  text-align: left;

  width: 100%;
  min-height: 30px;

  display: -webkit-box; /* Required for displaying ellipsis */
  -webkit-box-orient: vertical; /* Specify the box's orientation to be vertical */
  -webkit-line-clamp: 10; /* Number of lines to show before truncating */
  overflow: hidden; /* Hide any overflowing content */
  text-overflow: ellipsis;
`;

export const Note = ({ title, content }: NoteData) => {
  return (
    <NoteContainer>
      <NoteTitle>{title}</NoteTitle>
      <NoteContent>{content}</NoteContent>
    </NoteContainer>
  );
};
