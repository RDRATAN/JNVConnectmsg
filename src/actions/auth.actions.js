import { auth, firestore } from 'firebase';
import { authConstanst } from './constants';
import { getRealtimeUsers } from './user.actions';
var provider = new auth.GoogleAuthProvider();
export const signup = (user) => {

    return async (dispatch) => {

        const db = firestore();

        dispatch({type: `${authConstanst.USER_LOGIN}_REQUEST`});

        auth()
        .signInWithPopup(provider)
        .then(data => {
            console.log(data);
            const currentUser = auth().currentUser;
            const name = data.user.displayName.split(" ");
         
            currentUser.updateProfile({
                displayName: data.user.displayName
            })
            .then(() => {
                //if you are here means it is updated successfully
                db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: name[0],
                    lastName: name[1],
                    uid: data.user.uid,
                    createdAt: new Date(),
                    isOnline: true,
                    userPic:data.user.photoURL
                })
                .then(() => {
                    //succeful
                    const loggedInUser = {
                        firstName: name[0],
                        lastName: name[1],
                        uid: data.user.uid,
                        email: data.user.email,
                        displayPic:data.user.photoURL
                    }
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    console.log('User logged in successfully...!');
                    dispatch({
                        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                        payload: { user: loggedInUser }
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({ 
                        type: `${authConstanst.USER_LOGIN}_FAILURE`,
                        payload: { error }
                      });
                });
            });
        })
        .catch(error => {
            console.log(error);
        })


    }


}

export const signin = (user) => {
    return async dispatch => {

        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });

        auth()
  .signInWithPopup(provider)
  .then((data) => {
    console.log(data);


    const db = firestore();
    db.collection('users')
    .doc(data.user.uid)
    .update({
        isOnline: true
    })
    .then(() => {
        const name = data.user.displayName.split(" ");
        const firstName = name[0];
        const lastName = name[1];

        const loggedInUser = {
            firstName,
            lastName,
            uid: data.user.uid,
            email: data.user.email,
            displayPic:data.user.displayPic

        }

        localStorage.setItem('user', JSON.stringify(loggedInUser));

        dispatch({
            type: `${authConstanst.USER_LOGIN}_SUCCESS`,
            payload: { user: loggedInUser }
        });
    })
    .catch(error => {
        console.log(error)
    })

    



}).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
       


    }
}

export const isLoggedInUser = () => {
    return async dispatch => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if(user){
            dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        }else{
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login again please' }
            });
        }


    }
}

export const logout = (uid) => {
   if( window.confirm('Are you sure to checkout? Once you checkout, you will be detached with the chat bucket and we will ask you to login again next time and your Status will mark as Offline untill your Next login')
   ){ return async dispatch => {
        dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
        //Now lets logout user

        const db = firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline: false
        })
        .then(() => {

            auth()
            .signOut()
            .then(() => {
                //successfully
                localStorage.clear();
                dispatch({type: `${authConstanst.USER_LOGOUT}_SUCCESS`});
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`, payload: { error } })
            })

        })
        .catch(error => {
            console.log(error);
        })

        

    }
    }
    else{
        return async dispatch => {

            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    
            if(user){
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload: { user }
                });
            }else{
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                    payload: { error: 'Login again please' }
                });
            }
    
    
        }
    }
}

