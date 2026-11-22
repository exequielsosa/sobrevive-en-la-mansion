package ar.com.emistudio.mansion;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

// La app es el juego (la página de app-android/www) adentro de Capacitor.
// - Pantalla completa: se esconden la barra de arriba y la de navegación; vuelven un momento si se desliza
//   desde el borde.
// - Al salir de la app, la página queda "escondida" (como al cambiar de pestaña en el navegador) y el
//   juego se pausa solo y deja de sonar.
public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        pantallaCompleta();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) pantallaCompleta();
    }

    @Override
    public void onPause() {
        super.onPause();
        WebView web = getBridge() != null ? getBridge().getWebView() : null;
        if (web != null) web.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        WebView web = getBridge() != null ? getBridge().getWebView() : null;
        if (web != null) web.onResume();
        pantallaCompleta();
    }

    private void pantallaCompleta() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        WindowInsetsControllerCompat barras = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        barras.hide(WindowInsetsCompat.Type.systemBars());
        barras.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    }
}
