import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";

export const AppRouter = () => {

  const status = useCheckAuth();

  if( status === 'checking' ){
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        ( status === 'authenticated')
        ? <Route path="/*" element={ <JournalRoutes /> } />
        : <Route path="/auth/*" element={ <AuthRoute /> } />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> } />
        {/*login y Registro*/}
        {/* <Route path="/auth/*" element={ <AuthRoute /> } /> */}

        {/*JournalApp*/}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}
    </Routes>
  )
}
