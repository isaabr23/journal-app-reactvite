import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { starNewNote } from "../../store/journal/thunks"


export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal );

  // Para crear una ueva nota
  const onClickNewNote = () => {
    dispatch( starNewNote() );

  }

  return (
    <JournalLayout>

    {/* Si hay una nota seleccionada (si existe algo en active: {}) se mostrara NoteView caso contrario NothingSelectedView */}
    {/* doble !! para convertirlo a booleano y evitar errores de null ya que active es un objeto */}
      {
        (!!active) ? <NoteView/> : <NothingSelectedView/>
      }

      <IconButton
        onClick={ onClickNewNote }
        size='large'
        disabled={ isSaving }
        sx={{ 
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
         }}
      >
        <AddOutlined sx={{ fontSize: 30}} />

      </IconButton>
    </JournalLayout>
  )
}
