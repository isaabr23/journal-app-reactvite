// Thunks son para tareas asincronas y hacer dispatch a las acciones

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }
} 


export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )
        
        const result = await singInWithGoogle();
        // console.log({result})

        // Por si el usuario cancela el login aparece mensaje de error 
        if ( !result.ok) return dispatch( logout( result.errorMessage) )

        // Si todo salio bien con la autenticacion
        dispatch( login( result ))

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        // const result = await registerUserWithEmailPassword({ email, password, displayName });

        // si no sale bien mandamos error con logout (y cambiar el checking)
        if ( !ok ) return dispatch( logout({ errorMessage }) )
        // if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        // Si todo sale bien mandamos login (y cambiar el checking)
        dispatch( login({ uid, displayName, email, photoURL }))
        // dispatch( login( result ))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result)

        if ( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ))
    }
}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}
