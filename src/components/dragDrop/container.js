import { useRef, useEffect, useState } from "react";
import { FaUpload, FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import { base64ToArrayBuffer, convertExcelToCSV, convertFileBase64, createBlobFromCSV } from "../../utilities/fileUtilities";
import { TopNotification, createTopNotification } from "../utilities/notification";
import { validateCSVHeaders } from "../utilities/csv";
import { expectedHeadersConstant } from "./constants/headerConstants";

export function CustomDragDrop({
  filesData,
  onUpload,
  onDelete,
  count,
  formats
}) {
  const dropContainer = useRef(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  function handleDrop(e, type) {
    
    let files;
    if (type === "inputFile") {
      files = [...e.target.files];
    } else {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      files = [...e.dataTransfer.files];
    }

    const allFilesValid = files.every((file) => {
      return formats.some((format) => {
        return file.name.endsWith(`${format}`)
      }
      );
    });

    if (filesData.length >= count) {
      showAlert(
        "warning",
        "Maximo de archivos",
        `Solo ${count} archivos pueden ser cargados`
      );
      return;
    }
    if (!allFilesValid) {
      showAlert(
        "warning",
        "Archivo no válido",
        `Archivo no valido, favor de subir archivos:  ${formats
          .join(", ")
          .toUpperCase()}`
      );
      return;
    }
    if (count && count < files.length) {
      showAlert(
        "error",
        "Error",
        `Solo ${count} archivos ${count !== 1 ? "s" : ""} pueden subirse al mismo tiempo`
      );
      return;
    }

    if (files && files.length) {
      const nFiles = files.map(async (file) => {
        const base64String = await convertFileBase64(file);
        const csvData = await convertExcelToCSV(base64ToArrayBuffer(base64String))
        if(!validateCSVHeaders(csvData, expectedHeadersConstant)){
          
          return null;
        }
        
        const blob = createBlobFromCSV(csvData)
        return {
          name: file.name,
          file: blob,
          type: file.type,
          size: file.size
        };
      });

      Promise.all(nFiles).then((newFiles) => {
        if(!newFiles[0]){
          showAlert(
            "warning",
            "Formato incorrecto",
            `El formato del archivo es incorrecto, favor de revisarlo y cargar un archivo correcto`
          );
        }else{
          onUpload(newFiles);
          createTopNotification(2000).fire({
            icon: "success",
            title: "Archivo cargado"
          });
        }
      });
    }
  }

  
  useEffect(() => {
    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    }
    function handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
    dropContainer.current.addEventListener("dragover", handleDragOver);
    dropContainer.current.addEventListener("drop", handleDrop);
    dropContainer.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      if (dropContainer.current) {
        dropContainer.current.removeEventListener("dragover", handleDragOver);
        dropContainer.current.removeEventListener("drop", handleDrop);
        dropContainer.current.removeEventListener("dragleave", handleDragLeave);
      }
    };
  }, [filesData]);


  function showAlert(icon, title, text) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      width: 500,
      timer: 1500
    });
  }


  return (
    <>
      {/* Container Drop */}
      <div
        className={`${
          dragging
            ? "border border-[#2B92EC] bg-[#EDF2FF]"
            : "border-dashed border-[#e0e0e0]"
        } flex items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5`}
        ref={dropContainer}
      >
        <div className="flex-1 flex flex-col">
          <div className="mx-auto text-gray-400 mb-2">
            <FaUpload size={18} />
          </div>
          <div className="text-[12px] font-normal text-gray-500">
            <input
              className="opacity-0 hidden"
              type="file"
              multiple
              accept=".xlsx"
              ref={fileRef}
              onChange={(e) => handleDrop(e, "inputFile")}
            />
            <span
              className="text-[#4070f4] cursor-pointer"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Clik para subir
            </span>{" "}
            o drag and drop
          </div>
          <div className="text-[10px] font-normal text-gray-500">
            Solo archivos XLSX
          </div>
        </div>
      </div>

      {filesData.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-4">
          {filesData.map((img, index) => (
            <div className="w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3">
              <div className="flex justify-between">
                <div className="w-[70%] flex justify-start items-center space-x-2">
                  <div
                    className="text-[#5E62FF] text-[37px] cursor-pointer"
                    
                  >
                    {img.type.match(/image.*/i) ? (
                      <FaRegFileImage />
                    ) : (
                      <FaRegFile />
                    )}
                  </div>
                  <div className=" space-y-1">
                    <div className="text-xs font-medium text-gray-500">
                      {img.name}
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                      img.size / 1024
                    )} KB`}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="space-y-1">
                    <div
                      className="text-gray-500 text-[17px] cursor-pointer"
                      onClick={() => onDelete(index)}
                    >
                      <BsX className="ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">
                      Listo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
