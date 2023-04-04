import { useEffect, useState, useMemo } from 'react';
                                            // para validar el formulario (RegisterPage)
export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const [formValidation, setformValidation] = useState({})

    // Cada vez que cambia el formState llama a createValidators()
    useEffect(() => {
      createValidators();
    }, [ formState ]);

    // Para que cuando demos click en alguna nota del slice se visualice la informacion de cada nota en pantalla
    useEffect(() => {
      setFormState( initialForm );
    }, [ initialForm ])
    

    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( formValidation)) {
          if ( formValidation[formValue] !== null ) return false;
        }
        
        return true;
      }, [ formValidation ]);
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {}

        // Barremos cada uno de los valores de formValidations de RegisterPage result del barrido email, password y displayName
        for (const formField of Object.keys( formValidations )) {
            // console.log(formField)
            //Se puede destructurar la funcion del valor y el mensaje de error basado en el formFields
            const [ fn, errorMessage = 'Este campo es requerido (mensaje default)' ] = formValidations[formField];
            // console.log(fn)
            // console.log(errorMessage)
            //Se crea una nueva propiedad en formCheckedValues[`${ formField }Valid`] // se ejecuta la funcion (fn) y mandamos el valor que tenga en ese momento, si se cumple es null si no se cumple manda el mensaje                          
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setformValidation( formCheckedValues )
        // obtenemos el valor de cada campo (displayName, email y password) si son validos o no (null o message)
        // console.log(formCheckedValues)
    }        

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}