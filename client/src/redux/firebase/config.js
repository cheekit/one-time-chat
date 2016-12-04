export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJECT_NAME}.firebaseio.com`,
  storageBucket: `${process.env.REACT_APP_PROJECT_NAME}.appspot.com`
};
