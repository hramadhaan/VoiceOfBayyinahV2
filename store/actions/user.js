import database from '@react-native-firebase/database';
import User from '../../models/User';

export const USER_START = 'USER_START';
export const USER_ERROR = 'USER_ERROR';
export const USER_FETCH = 'USER_FETCH';

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: USER_START,
    });
    database()
      .ref('User')
      .once('value')
      .then((snapshot) => {
        const loadedUser = [];
        const users = snapshot.val();

        for (const key in users) {
          loadedUser.push(
            new User(
              key,
              users[key].displayName,
              users[key].photoURL,
              users[key].email,
              users[key].typeUser,
            ),
          );
        }

        dispatch({
          type: USER_FETCH,
          payload: loadedUser,
        });
      })
      .catch((err) => dispatch({type: USER_ERROR, error: err}));
  };
};
