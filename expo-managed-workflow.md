# expo-managed-workflow
https://rnfirebase.io/#expo-managed-workflow

Vaig a provar a instaŀlar `npx expo install @react-native-firebase/app`, en compte de nom install.
(No sé si ha servit, la consola pareix dir que ha anat a executar npm install)

`npx expo prebuild --clean`

Pareix que anem bé. S'ha posat a crear carpetes android i ios amb l'estructura de gradle.
Es trenca perquè no troba l'arxiu de config de ios. Vaig a eliminar la referència a ios en app.json, a vore si em deixa.

De nou: 
`npx expo prebuild --clean`
El mateix error. Pero pareix que la part de Android l'ha feta bé.

Intente arrancar el projecte
`npx expo start`
Ix l'error dins de java, falta importar coses de `invertase`(?).

La doc de https://rnfirebase.io va botant d'un lloc a l'altre. Si android CLI, si Expo, si Expo de una manera, si Expo d'una altra (managed workflow) que et porta de nou a Android CLI.
L'error seguix eixint, però he seguit avant d'Android CLI com si no estiguera (hi ha un autolinking mencionat, com si ell sabera qu¡e ha de descarregar), i li done a executar la app amb un altre comand:
`npx react-native run-android` Això provca la descàrrega de molts paquets d'internet.
Molta info en la consola mentre es descarrega tot (alguns paquets diu que els ha trobat en node_modules, altres està descarregant-los).

Error:
Execution failed for task ':app:checkDebugAarMetadata'.
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.

La veritat és que no he seguit tots els passos en `https://rnfirebase.io/#2-react-native-cli---android-setup`. Torne a posar-me.

Torne a executar amb `npx react-native run-android`
De nou, descarregant les coses que li falten. Molta info en consola mentre arranca el projecte.

Error de nou. Cada vegada més estrany (falta el paquet R).

## Torne a començar
Quesig els passos fins a --clear i execute l'aplicació des de `npx expo start`.
Ix l'error que falta `ReactNativeFirebaseAppPackage` dins del java (que yo no he creat).
Faig una busca en google i apareix un altre enllaç: `https://rnfirebase.io/install-android` per a integrar manualment React Native Firebase en Android.
Vaig a seguir-lo.

```
Add the following to your projects /android/settings.gradle file:

include ':@react-native-firebase_app'
project(':@react-native-firebase_app').projectDir = new File(rootProject.projectDir, './../node_modules/@react-native-firebase/app/android')
``


## Potser he de "llevar" coses, no afegir-les, segons les últimes versions
https://github.com/invertase/react-native-firebase/issues/7217#issuecomment-1752166762




