// TAREAS ASINCRONAS
// getState es todo lo que tenemos en el store

import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, deleteNoteById, noteUpdate, savingNewNote, setActiveNote, setNote, setPhotoToActiveNote, setSaving } from './journalSlice';

export const starNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth;

        // para grabar en firebase necesitamos el uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Para acceder a las opciones documento y colleccion de base de datos 
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ));
        // aqui lo mandamos a grabar
        await setDoc( newDoc, newNote );

        // creamos la propiedad ID a la newNote (Es el ID de firebase automatico)
        newNote.id = newDoc.id;

        // Para agregar la newNote a notes: [] del journalSlice y cambiar a false isSaving
        dispatch( addNewEmptyNote( newNote ))
        // Para agregar la nota en active: null del journalSlice para saber cual es la nota seleccionada
        dispatch( setActiveNote( newNote ))

    }
}

// Se llama en useCheckAuth por que cargara las notas despues de la autenticacion
export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        // Mandara error si el uid no existe
        if( !uid ) throw new Error('El UID del usuario no existe')

        // Se mandan las notas del usuario a setNote gracias a loadNotes
        const notes = await loadNotes( uid );
        dispatch( setNote( notes ) );
    }
}

// Para actualizar las notas
export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        // tenemos el uid para saber si esta autenticado y la nota a cambiar ( active = a la nota activa y cambiamos el nombre a "note")
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        // Eliminaremos el id (para que no nos genere ese dato) ya que ya lo tenemos en la creacion de la nota
        const noteToFireStore = { ...note };
        delete noteToFireStore.id

        // Guardamos los cambio del a la base de datos
        // hacemos nuestro path para direccionar hacia que documento (nota) queremos el cambio
                        // Nuestra BD, el path a direccionar ( con el uid del usuario auth y el id (de la nota activada) de active)                            
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )

        //setDoc es para actualizar el docuemto de firebase( path, lo que queremos mandar, merge es para que si no mandamos un dato y ya estaban los mantenga )
        await setDoc( docRef, noteToFireStore, { merge: true })
        
        // Para actualizar la nota de la barra lateral
        dispatch( noteUpdate( note ) );
    }
}

// Para subir imagenes a cloudinary
export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        // Para subir solo una imagen
        // await fileUpload( files[0] );

        // Para subir imagenes simultaneas
        // Primero se crea un arrglo con todas las imagenes
        const fileUploadPromises = []
        for( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        // disparamos las promesas Promise.all espera un arreglo de promesas
        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch ( setPhotoToActiveNote( photosUrls) )
    }
}

// Para Borrar la nota al dar click en el boton 'Borrar'
export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // console.log({uid, note})

        // Para avisarle a firebase que queremos llegar a cierto documento
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        
        // Para decirle a Firebase que elimine el documento de referencia de arriba
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ));
        
    }
}

