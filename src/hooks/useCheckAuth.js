import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect(() => {
    
    // Para cuando el estado de auth cambia (funcion de firebase) y nos pide el Auth (FirebaseAuth) y despues un callback de tipo user
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      // console.log(user)
      if( !user ) return dispatch( logout() );

      const { uid, email, displayName, photoURL } = user;
      dispatch( login({ uid, email, displayName, photoURL }) );

      // Para cargar las notas despues de autenticar
      dispatch( startLoadingNotes() );
    })

  }, [])

  return status
}