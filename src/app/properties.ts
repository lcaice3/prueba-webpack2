import { environment } from '../environments/environment';

export class Properties {
    static get baseUrl() {
        if (environment.production) {
            return 'http://bdb-qa-ejemplo-libranza.s3-website-us-east-1.amazonaws.com';
        } else if (environment.qa) {
            return 'http://localhost:8080';
        }else{
            return 'http://localhost:8080';
        }
    }

    static get logUrl() {
        if (environment.production) {
            return 'http://34.232.48.67:8090';
        } else {
            return 'UrlServicioLogsDesarrollo';
        }
    }
}
