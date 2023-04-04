import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from "../components/ImageGallery"
import { setActiveNote, setNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note )

    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    // Pasa la informacion que actualizada y la manda al 
    useEffect(() => {
      dispatch( setActiveNote(formState) )
    }, [ formState ])

    useEffect(() => {
      if( messageSaved.length > 0 ) {
        Swal.fire('Nota actualizada', messageSaved, 'success')
      }
    }, [messageSaved])
    

    // Para guardar la informacion que actualicemos de la nota 
    const onClickNote = () => {
        dispatch( startSaveNote() );
    }

    // manejar el input de archivos (imagenes a subir)
    const onFileInputChange = ({ target }) => {
        // console.log(target.files)

        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) )
    }
    
    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
                        {/* Esto simula el click que damos al input de arriba */}
            <IconButton onClick={ () => fileInputRef.current.click() }>
                <UploadOutlined
                    color="primary"
                    disabled={ isSaving }
                    // Esto simula el click que damos al input de arriba 
                    // onClick={ () => fileInputRef.current.click() }
                />
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={ onClickNote }
                color='primary'
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize:30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border:'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type='text'
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio el dia de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline/>
                Borrar
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls }/>
    </Grid>
  )
}
