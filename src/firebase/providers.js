import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try {
                                        //  de mi config.js, el proveedor que quiero el servicio
        const result = await signInWithPopup( FirebaseAuth, googleProvider )

        // const user = result.user;
        // console.log({ user })

        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true, // personalizado

            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        
        // Esto es de la configuracion de la pagina de firebase
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage,
        }
    }
}

// Se crea un nuevo proveedor cuando el usuario se registra sin google
// Se llama en thunks.js
export const registerUserWithEmailPassword = async({ email, password, displayName }) =>{

    try {   
        
        // variable de firebase createUserWithEmailAndPassword pide 3 cosas auth, email y password    
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = resp.user;
        // console.log(resp)

        // Actualizar el displayName en Firebase ya que nos sale null por que es registro nuevo 
        // funcion de firebase ( variable de firebase ), lo que queremos actualizar
        // es una promesa
        await updateProfile( FirebaseAuth.currentUser, { displayName} );
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        // console.log(error)
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }


    } catch (error) {
        // console.log(error)
        return { ok: false, errorMessage: error.message }
    }

}

export const logoutFirebase = async() => {

    // Esta funcion cierra la sesion abierta de todos los proveedores que se configuraron (correo, facebook, gmail, etc...)
    return await FirebaseAuth.signOut();

}