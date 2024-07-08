
import { useState } from "react";
import { CustomDragDrop } from "./container";

export default function DragComponent() {
  const [ownerLicense, setOwnerLicense] = useState([]);

  function uploadFiles(f) {
    setOwnerLicense([...ownerLicense, ...f]);
  }

  function deleteFile(indexImg) {
    const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
    setOwnerLicense(updatedList);
  }

  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5">
      <div className="pb-[8px] border-b border-[#e0e0e0] flex flex-wrap justify-between">
        <h2 className="text-black text-[17px] font-[600]">
          Carga de archivo
        </h2>
        <div className=" px-1 rounded border-2 cursor-pointer
        border-neutral-200 text-neutral-200
        ">Procesar archivo</div>
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
