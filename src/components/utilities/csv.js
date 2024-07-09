export function validateCSVHeaders(csvString, expectedHeaders) {
    // Divide el CSV en líneas
    const lines = csvString.split('\n');
    // Toma la primera línea (las cabeceras)
    const headers = lines[0].split(',');

    // Verifica que el número de cabeceras coincida
    if (headers.length !== expectedHeaders.length) {
        return false;
    }

    // Verifica que las cabeceras coincidan con las esperadas
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].trim() !== expectedHeaders[i]) {
            return false;
        }
    }

    return true;
}