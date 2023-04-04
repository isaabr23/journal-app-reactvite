import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // Asi se vera 'active' si hay una nota seleccionada
        // active: {
        //     id: 'ABCD123',
        //     title: '',
        //     doby: '',
        //     date: 123456,
        //     imagesUrls: [],
        // }
    },
    reducers: {
        // Para deshabilitar el boton (+) y que el usuario no apriete mas veces el boton (seguidas)
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        // Crear una nota al dar click en boton (+)
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        // agregamos el objeto de la nota a active (nota seleccionada)
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        // Agregamos las notas existentes en firebase a notes: [] despues de autenticar el usuario
        setNote: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = ''
        },
        noteUpdate: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            })
            
            // Para mandar mensaje de alerta 
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
        },
        // Para cuando se suben las imagenes en la nota activa
        setPhotoToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false;
        },
        // Para limpiar todo cuando salgamos de la sesion
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );

        },
    }
});
// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    noteUpdate,
    deleteNoteById,
    savingNewNote,
    setPhotoToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;