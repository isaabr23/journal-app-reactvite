import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography, useFormControl } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { Google } from "@mui/icons-material";
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
  
// Se crea formData para mandarselo a useForm aunque tambien se puede hacer como en login
const formData = {
  email: '',
  password: '',
  displayName: ''
}

// Se crea una variable para saber las validaciones del formulario
// Se podria hacer mas sencillo con react-hook-form pero para aprender se realizo asi 
const formValidations = {
       // Es un arreglo que la primera posicion es la funcion que evalua y el segundo es el mensaje de error
  email: [ (value) => value.includes('@'), 'El correo debe tener un @.'],
  password: [ (value) => value.length >= 6, 'El password debe tener minimo 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  // Para que no este la alarma de error cuando no hay nada escrito la primera vez
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid  
  } = useForm(formData, formValidations)

  const onSubmit = ( event ) => {
    event.preventDefault();
    // console.log(formState)

    if ( !isFormValid ) return;
    
    // se crea un usuario en firebase
    dispatch( startCreatingUserWithEmailPassword( formState ) )
    
  }
    return (
      <AuthLayout title="Crear cuenta"> { /* sirve para reutilizar codigo que se legara a repetir en otras paginas */}
        <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
                  fullWidth
                  name="displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted } // Doble negacion convierte en valor booleano (elimina el mensaje de consola)
                  helperText={ displayNameValid }
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }
                  helperText={ emailValid }
                />
              </Grid>
  
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ passwordValid }
                />
              </Grid>
  
              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '' : 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 }>
                  <Button 
                    disabled={ isCheckingAuthentication }
                    type="submit"
                    variant="contained" 
                    fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
              </Grid>
  
              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  Ingresar
                </Link>
              </Grid>
            </Grid>
          </form>
      </AuthLayout>
  
    )
  }
  
