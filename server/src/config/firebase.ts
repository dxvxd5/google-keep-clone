import admin from 'firebase-admin';
import { FIREBASE_CONFIG } from './env.variable';

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CONFIG),
});

export const firestore = admin.firestore();

export const NOTES_BASE_PATH = '/notes';

// export const collabBasePath = '/collaborations';

// Functions to get the path to the different elements in the database
export const geNotePath = (noteId: string) => {
  return `${NOTES_BASE_PATH}/${noteId}`;
};

// export const getAll;

// export function getProjectBasePath(userID: string): string {
//   return `${getUserPath(userID)}/projects`;
// }

// export function getProjectPath(userID: string, projectID: string): string {
//   return `${getProjectBasePath(userID)}/${projectID}`;
// }

// export function getFileBasePath(userID: string, projectID: string): string {
//   return `${getProjectPath(userID, projectID)}/files`;
// }

// export function getFilePath(
//   userID: string,
//   projectID: string,
//   fileID: string,
// ): string {
//   return `${getFileBasePath(userID, projectID)}/${fileID}`;
// }

// export function getFileContentBasePath(
//   userID: string,
//   projectID: string,
// ): string {
//   return `${getProjectPath(userID, projectID)}/fileContents`;
// }

// export function getFileContentPath(
//   userID: string,
//   projectID: string,
//   contentID: string,
// ): string {
//   return `${getFileContentBasePath(userID, projectID)}/${contentID}`;
// }

// export function getCollabPath(collabID: string): string {
//   return `${collabBasePath}/${collabID}`;
// }
