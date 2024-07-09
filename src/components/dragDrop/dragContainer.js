
import { useContext, useState } from "react";
import { CustomDragDrop } from "./container";
import { SiMicrosoftexcel } from "react-icons/si";
import { AxiosWithHeaderFiles } from "../../services/httpService";
import AuthContext from "../../context/authContext";
import { createTopNotification } from "../utilities/notification";

export default function DragComponent() {
  // const [state.files, setFiles] = useState([]);
  const [state, setState] = useState({
    loading:false , files:[]
  })
  const authContext = useContext(AuthContext)
  function uploadFiles(f) {
    setState({ ...state, files: [...state.files, ...f]});
  }

  function deleteFile(indexImg) {
    const updatedList = state.files.filter((ele, index) => index !== indexImg);
    setState({...state, files: updatedList});
  }

  function uploadFileToDB() {
    setState({...state, loading: true})
    const formData = new FormData();

    for (let i = 0; i < state.files.length; i++) {
      formData.append('files[]', state.files[i].file, state.files[i].name );
    }
    AxiosWithHeaderFiles('/api/bulkLoad', formData , authContext.token ).then(() => {
      createTopNotification(2000).fire({
        icon: "success",
        title: "Archivo procesado correctamente ! "
      })
      setState({...state, loading: false , files:[] })

    }).catch( () =>{
      createTopNotification(2000).fire({
        icon: "error",
        title: "Formato no válido  "
      })
    })
  }

  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5">
      <div className="pb-[8px] border-b border-[#e0e0e0] flex flex-wrap justify-between">
        <div className="flex flex-col">

          <div className="flex gap-2">
            <SiMicrosoftexcel size={28} className="text-neutral-600" />
            <h2 className="text-black text-[17px] font-[600] ">
              Carga masiva
            </h2>
          </div>
          <div className="flex">
            Puedes arrastrar un archivo excel y procesarlo para una carga masiva de usuarios
          </div>
        </div>
        <button disabled={state.files.length == 0 || state.loading} className={`px-1 rounded border-2 cursor-pointer content-center
        ${(state.files.length > 0 && !state.loading) ? "border-neutral-700 text-neutral-700" :
            "border-neutral-300 text-neutral-300"
          } 
        `}
          onClick={() => uploadFileToDB()}
        >Procesar archivo</button>
      </div>
      <CustomDragDrop
        filesData={state.files}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={1}
        formats={["xlsx"]}
      />
    </div>
  );
}
