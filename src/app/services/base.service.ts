import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { Properties } from '../properties';


export class BaseService {

  protected baseUrl = Properties.baseUrl;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor() { }

  /**
    * Metodo que entrega los headers para realizar una peticion http
    * @return {Headers} headers para una petición http
    */
    get headers(): Headers {
      return this._headers;
  }

  /**
  * Metodo para el manejo de errores de una peticion en http
  * @param error response de error de una peticion http
  * @return {Observable} con el mensaje de error obtenido del response
  */
  handleError(error: Response | any): Observable<string> {
      let errMsg: string;
      errMsg = 'Ocurrió un error, intenta nuevamente';
      return Observable.throw(errMsg);
  }
  
}
