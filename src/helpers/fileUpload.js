// Para subir imagenes a cloudinary por medio de la URL que antes se reviso en PostMan

export const fileUpload = async( file ) => {

    // Error si no hay archivos a subir
    if( !file ) throw new Error('No existe el archivo')
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dmh5rwaq4/upload';

    //Se crea un nuevo body

    const formData = new FormData();
    // upload_preset = KEY , react-journal-vite = VALUE de body de postman *form-data
    formData.append('upload_preset', 'react-journal-vite')
    // 'file' = KEY de postman body *form-data (como si fuera el encabezado), file = el archivo(s) que subiremos = VALUE
    formData.append('file', file)

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json();

        return cloudResp.secure_url;
        
    } catch (error) {
        console.log(error)
        throw new Error( error.message );
    }
}