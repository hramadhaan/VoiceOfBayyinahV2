import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';

GoogleSignin.configure({
  scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '147163713047-bd521r7qrf1nkedp0eisdpht7bmbsi7g.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  iosClientId:
    '147163713047-78v6c8t835759e6m5cglbockpk2n4t3v.apps.googleusercontent.com', // [iOS] opti
});

export const AUTHENTICATION = 'AUTHENTICATION';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

const saveDataStorage = (uid, email, name, image, typeUser) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      uid,
      email,
      name,
      image,
      typeUser
    }),
  );
};

export const authentication = (uid, email, name, image, typeUser) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATION,
      uid: uid,
      email: email,
      name: name,
      image: image,
      typeUser: typeUser
    });
  };
};

export const login = () => {
  return async (dispatch) => {
    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth()
        .signInWithCredential(googleCredential)
        .then((googleSignIn) => {
          database().ref('User').child(googleSignIn.user.uid)
            .once('value').then(snapshot => {
              if (snapshot.exists()) {
                // console.log(snapshot.val())
                const data = snapshot.val()
                const key = snapshot.key
                dispatch(
                  authentication(key, data.email, data.displayName, data.photoURL, data.typeUser)
                )
                saveDataStorage(key, data.email, data.displayName, data.photoURL, data.typeUser)
              } else {
                // console.log('Tidak Ada')
                database()
                  .ref('/User')
                  .child(`${googleSignIn.user.uid}`)
                  .set({
                    uid: googleSignIn.user.uid,
                    email: googleSignIn.user.email,
                    displayName: googleSignIn.user.displayName,
                    photoURL: googleSignIn.user.photoURL,
                    typeUser: "2"
                  })
                  .then((res) => console.log(res))
                  .catch((err) => {
                    console.log(err);
                  });

                dispatch(
                  authentication(
                    googleSignIn.user.uid,
                    googleSignIn.user.email,
                    googleSignIn.user.displayName,
                    googleSignIn.user.photoURL,
                    "2"
                  ),
                );
                saveDataStorage(
                  googleSignIn.user.uid,
                  googleSignIn.user.email,
                  googleSignIn.user.displayName,
                  googleSignIn.user.photoURL,
                  "2"
                );
              }
            })

          // CHECK IF REGISTER



        })
        .catch((err) => {
          console.log(err);
        });

      // console.log(googleSignIn.user);

      // REALTIME DATABASE

      // CRASHLYTICS
      // crashlytics().log(`User: ${googleSignIn.user.displayName}, Signed In !`);
      // await Promise.all([
      //   crashlytics().setUserId(googleSignIn.user.uid),
      //   crashlytics().setAttributes({
      //     email: googleSignIn.user.email,
      //     displayName: googleSignIn.user.displayName,
      //     role: 'User',
      //   }),
      // ]);

      // ANALYTICS
      // await analytics().logEvent('Login', {
      //   id: googleSignIn.user.uid,
      //   role: 'User',
      // });

      // TO REDUX
    } catch (error) {
      let message = 'Something went wrong!';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        message = 'Proses masuk dibatalkan';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        message = 'Sedang dalam progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        message = 'Perangkat ini tidak terdapat layanan Google Services';
      } else {
        // some other error happened
      }
      crashlytics().recordError(err);
      throw new Error(message);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    try {
      auth()
        .signOut()
        .then((res) => {
          AsyncStorage.removeItem('userData');
          dispatch({
            type: LOGOUT,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
