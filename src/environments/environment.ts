// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  adsense: {
    adClient: 'ca-pub-1120436091721652',
    show: true
 },
  firebase: {
    projectId: 'marsun-reseptit',
    appId: '1:335307233189:web:39ecfa651940e2a20f3a4c',
    databaseURL: 'https://marsun-reseptit-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'marsun-reseptit.appspot.com',
    apiKey: 'AIzaSyDPgFot6mU3_9SizQpOYlGUXhQjF2kvXWQ',
    authDomain: 'marsun-reseptit.firebaseapp.com',
    messagingSenderId: '335307233189',
    measurementId: 'G-NPTH5CEKC2',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
