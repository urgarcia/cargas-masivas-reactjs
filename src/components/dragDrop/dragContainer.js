
import { useContext, useState } from "react";
import { CustomDragDrop } from "./container";
import { SiMicrosoftexcel } from "react-icons/si";
import { AxiosWithHeaderFiles } from "../../services/httpService";
import AuthContext from "../../context/authContext";

export default function DragComponent() {
  const [ownerLicense, setOwnerLicense] = useState([]);
  const authContext = useContext(AuthContext)
  function uploadFiles(f) {
    setOwnerLicense([...ownerLicense, ...f]);
  }

  function deleteFile(indexImg) {
    const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
    setOwnerLicense(updatedList);
  }

  function uploadFileToDB() {
    const formData = new FormData();

    for (let i = 0; i < ownerLicense.length; i++) {
      formData.append('files[]', ownerLicense[i].file, ownerLicense[i].name );
    }
    console.log(formData)
    debugger
    AxiosWithHeaderFiles('/api/bulkLoad', formData , authContext.token )
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
        <button disabled={ownerLicense.length == 0} className={`px-1 rounded border-2 cursor-pointer content-center
        ${(ownerLicense.length > 0) ? "border-neutral-700 text-neutral-700" :
            "border-neutral-300 text-neutral-300"
          } 
        `}
          onClick={() => uploadFileToDB()}
        >Procesar archivo</button>
      </div>
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={1}
        formats={["xlsx"]}
      />
    </div>
  );
}
