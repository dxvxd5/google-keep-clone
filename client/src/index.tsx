import React from 'react';
import ReactDOM from 'react-dom';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Note } from './components/Note';
import { NoteData } from './types';
import { NoteList } from './components/NoteList';

const SERVER_DEV_URL = 'http://localhost:4000';

type NoteEndpointResponse<K extends string, T> = {
  data: {
    [key in K]: T;
  };
};

const App = () => {
  const { isPending, error, data } = useQuery<
    NoteEndpointResponse<'notes', NoteData[]>
  >({
    queryKey: ['all-notes'],
    queryFn: () =>
      fetch(`${SERVER_DEV_URL}/note/all`).then((res) => res.json()),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const notes = data.data.notes;

  return (
    <div>
      <h1>Notes</h1>
      <NoteList notes={notes} />
    </div>
  );
};

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
