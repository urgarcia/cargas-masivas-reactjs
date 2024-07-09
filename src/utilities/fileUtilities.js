import * as XLSX from 'xlsx'; 

export async function convertFileBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
export function base64ToArrayBuffer(base64) {
    const base64Encoded = base64.split(',')[1]; // Separa la cabecera "data:application/..."
    const binaryString = window.atob(base64Encoded); // Decodifica base64 a binario
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binaryString.charCodeAt(i);
    }
    return buffer;
  }
export function convertBase64ToBlob(base64, mime) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mime });
  }
export const convertExcelToCSV = async (buffer) => {
    debugger
    // const buffer = await blob.ArrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
  
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
  
    // Retorna el CSV como string
    return sheetData;
  };

  export function createBlobFromCSV(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    return blob;
  }