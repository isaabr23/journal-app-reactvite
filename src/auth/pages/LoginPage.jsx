import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth);
  // console.log(status)

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData )
  
  // si el estatus es checking regresa un valor booleano con dependencia de status [status] si el estatus cambia se vuelve a memorizar si no cambia no se vuelve a ejecutar 
  const isAuthenticating = useMemo( () => status === 'checking', [status])

  const onSubmit = ( event ) => {
    event.preventDefault();

    // console.log({email, password})
    dispatch( startLoginWithEmailPassword({ email, password }) )
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title="Login"> { /* sirve para reutilizar codigo que se legara a repetir en otras paginas */}
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
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
              />
            </Grid>

            <Grid 
              container
              display={ !!errorMessage ? '' : 'none' }
            >
              <Grid 
                item
                xs={ 12 }
                sx={{ mt: 1 }}
              >
                  <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                    disabled={ isAuthenticating }
                    type="submit" 
                    variant="contained" 
                    fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                    disabled={ isAuthenticating }
                    variant="contained" 
                    fullWidth
                    onClick={ onGoogleSignIn }
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>

  )
}
