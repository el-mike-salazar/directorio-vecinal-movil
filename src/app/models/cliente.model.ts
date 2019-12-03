export class ClienteModel {

    _id: string;
    strNombre: string;
    strPrimerApellido: string;
    strSegundoApellido: string;
    strTelefono: string;
    strCorreo: string;
    strPassword: string;
    strColonia: string;
    strCalle: string;
    numCodigoPostal: any;
    strCentrocrecer: string;
    strImagen: string;
    arrRol: [
        {
            idRol: number;
        }
    ];
}
