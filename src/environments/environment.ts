// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  adsense: {
    adClient: 'ca-pub-1120436091721652',
    show: true
  },
  version:{
  major: 0,
  minor: "001"
  },
  oauth:{
  redirectUrl:"http://localhost:4200/Dashboard"
  },
  pocketbaseUrl: "https://marsun-reseptit.com",

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
