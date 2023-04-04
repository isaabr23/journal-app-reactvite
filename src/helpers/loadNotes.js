import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async( uid = '' ) => {
    // Mandara error si el uid no existe
    if( !uid ) throw new Error('El UID del usuario no existe')

    // Para traer 'documentos' de la coleccion de firebase
    // tenemos que apuntar a la coleccion correcta en este caso es 'notes'
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    // getDocs es funcion de firebase para atraer los documentos
    const docs = await getDocs( collectionRef ); 

    // console.log(docs) se obtiene toda la informacion de firebase (documentos)

    // Para que nos muestre solo la data que necesitamos de los docuentos
    // docs.forEach( doc => {
    //    console.log( doc.data() );
    // })

    // Se crea array de notas para poder agregar el id (automatico de firebase) ya que tambien lo necesitamos

    const notes = [];
    docs.forEach( doc => {
        // obtenemos el id de doc.id y se lo asignamos a 'id' y esparciendo la data se lo enexamos
        notes.push({ id: doc.id, ...doc.data() });
    })
    
    // Obtenemos lo siguiente console.log(notes)
    // body: ""
    // date: 1657912605627
    // id: "2JpazWE2ZqzLsIieLeOJ" 
    // title: "" 

    return notes;
}