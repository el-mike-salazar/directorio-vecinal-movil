export class LoginModel {
  strEmail: string;
  strPassword: string;
}

// tslint:disable-next-line: class-name
export class PersonaModel {
  strNombre: string;
  strPrimerApellido: string;
  strSegundoApellido: string;
  strCalle: string;
  strColonia: string;
  numCodigoPostal: any;
  strCorreo: string;
  strPassword: string;
  strPasswordConf: string;
  arrRol: string;
  strTelefono: string;
  nombreImg: string = '/noImage.png';
}
