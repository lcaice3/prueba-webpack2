import { environment } from '../environments/environment';

export class Properties {
    static get baseUrl() {
        if (environment.production) {
            // return 'http://localhost:8080'
            return 'http://ec2-34-232-109-68.compute-1.amazonaws.com:8080';
        } else {
           // return 'https://lhkpomfxz4.execute-api.us-east-1.amazonaws.com/qa';
            return 'http://localhost:8080';
            // return 'http://34.232.109.68:8080';
            // return 'http://34.232.48.67:8090';
            // return 'http://192.168.3.224:8090';
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
