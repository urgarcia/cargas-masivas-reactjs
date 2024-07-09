import axios from "axios";
const host = process.env.REACT_APP_API_HOST 

export const AxiosWithoutHeader = async (url, method, body , contentType = 'application/json') =>{

    try {
        const response = await axios({
            method,
            url: host + url,
            data: body,
            headers: {
                'Content-Type': contentType
              }
          })
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Error en la peticion axios ")
    }
}
export const AxiosWithHeader = async (url, method, body , tokenReq, contentType = 'application/json') =>{
    const token = (tokenReq) ? tokenReq : localStorage.getItem("userData").token;

    try {
        const response = await axios({
            method,
            url: host + url,
            data: body,
            headers: {
                'Content-Type': contentType,
                'Authorization': 'Bearer ' + token
              }
          })
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Error en la peticion axios ")
    }
}
export const AxiosWithHeaderFiles = async (url, body, tokenReq= null) =>{
  const token = (tokenReq) ? tokenReq : localStorage.getItem("userData").token;
  
  const urll = host + url
  try {
      const response = await axios.post(urll, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': "Bearer " + token
        },
      })
      return response;
  } catch (error) {
      console.error(error);
      throw new Error("Error en la peticion axios ")
  }
}

// promises -> PUEDEN SER VARIOS ARREGLOS DE PROMESAS 
// data -> ARREGLO DE DATOS DE LAS PROMESAS QUIERO DEVOLVER ESTO...
export const debouncePromises = (promises, callback) => {
  const timer = setTimeout(() => {
    Promise.all(promises)
      .then((dataResponse) => {
        callback(dataResponse);
      })
      .catch((e) => {
        console.error('Error al obtener información', e);
      })
      .finally(() => {
        // Cualquier lógica que desees ejecutar después de obtener los datos
      });
  }, 500);

  return () => clearTimeout(timer);
};