# App de Android — Sobrevive en la mansión

La app trae el juego **adentro** (no abre la web): anda sin internet desde que se instala. Está hecha con
[Capacitor](https://capacitorjs.com) 8 y apunta a Android 16 (API 36), lo que pide Google Play desde el 31/8/2026.

Por qué adentro y no una app que abre la web: el juego va en Google Play «para todos, chicos incluidos», y las
reglas de Familias de Google no permiten apps que solo muestran una web (ver `claude/plan-app-android.md` en el Project).

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `src/main.tsx` | La pantalla de la app: la misma de `/jugar` (`components/mansion/SoloJuego.tsx`), sin service worker. Idioma: castellano si el teléfono está en castellano; si no, inglés. |
| `armar-www.mjs` | Arma `www/` (no va a git): la pantalla, una copia de `public/juego` con el service worker de Construct apagado, imágenes y fuentes. |
| `capacitor.config.json` | Nombre y paquete: **`ar.com.emistudio.mansion`**. El paquete no se puede cambiar después de subir la app a Play. |
| `android/` | El proyecto de Android Studio. Cambios propios: `MainActivity.java` (pantalla completa y pausa al salir), `AndroidManifest.xml` (horizontal y vibración), `res/values-es/strings.xml` (nombre en castellano), íconos y splash. |
| `herramientas/iconos_android.py` | Rearma los íconos y el splash desde un ícono maestro. **Los de ahora son provisorios** (la cruz): el definitivo sale de ARTE-0006. |

## Armar y probar (en la PC)

Hace falta Node 22 o más y Android Studio Otter (2025.2.1) o más nuevo. En PowerShell, en la carpeta del repo:

```powershell
npm ci
cd app-android
npm ci
npm run armar
```

`npm run armar` arma `www/` y lo copia al proyecto de Android. **Hay que correrlo cada vez que cambia el juego
(`public/juego`) o la pantalla**, antes de compilar.

Después, en Android Studio: **File → Open → `app-android/android`**. Para probar en el celular: activar la
depuración USB, enchufarlo y apretar **Run**.

## Versión para Google Play

1. En `android/app/build.gradle`, subir `versionCode` (1, 2, 3…: cada subida a Play necesita uno más alto) y
   `versionName` (lo que ve la gente).
2. **Build → Generate Signed App Bundle or APK → Android App Bundle**.
3. La primera vez, **Create new…** para crear la llave de subida (`.jks`). Guardala fuera del repo y fuera de
   `Juego EMI`, con una copia de respaldo, y anotá las contraseñas en un lugar seguro. No se comparte con nadie
   (tampoco con Claude ni con Codex).
4. Elegí **release** y se genera `app-release.aab`. Ese archivo es el que se sube a Play Console.
5. En Play Console, dejá activada la firma de apps de Google Play (Play App Signing): si se pierde la llave de
   subida, se puede pedir otra.
