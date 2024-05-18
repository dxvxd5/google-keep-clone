import dotenv from 'dotenv';

dotenv.config();

function assert(value: string | undefined, message: string): string {
  if (!value) throw new Error(message);
  return value;
}

const { PORT: port, FIREBASE_ADMIN_SDK_SERVICE_ACCOUNT: firebaseCredential } =
  process.env;

function pleaseSpecify(toSpecify: string): string {
  return `Please specify ${toSpecify} in the .env file`;
}

export const PORT = assert(port, pleaseSpecify('the port'));

const FIREBASE_ADMIN_SDK_SERVICE_ACCOUNT = assert(
  firebaseCredential,
  pleaseSpecify('the firebase service account configuration'),
);

export const FIREBASE_CONFIG = JSON.parse(FIREBASE_ADMIN_SDK_SERVICE_ACCOUNT);
