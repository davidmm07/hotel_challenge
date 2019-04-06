import { environment } from '../environments/environment';

export const Config = {
    LOCAL: {
        HOTEL_SERVICE: 'http://localhost:3977/api/',
    },
    PROD: {
      HOTEL_SERVICE: 'http://localhost:3978/api/',
  },
};


export const GENERAL = {
    ENTORNO: Config[environment.entorno],
     //ENTORNO: 'LOCAL',
};
