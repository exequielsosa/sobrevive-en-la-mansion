"""Arma los íconos y la pantalla de inicio de la app de Android a partir de un ícono maestro.
Uso (desde app-android): python3 herramientas/iconos_android.py MAESTRO.png
- MAESTRO.png: cuadrado, opaco, idealmente 1024×1024, con lo importante adentro del círculo central
  de 600 px (es lo que pide ARTE-0006: Android recorta el ícono en círculo o en otras formas).
- Ícono adaptativo (Android 8 en adelante): fondo negro + el maestro entero como frente (108 dp).
- Íconos viejos: ic_launcher (cuadrado) e ic_launcher_round (círculo).
- Pantalla de inicio (splash): negro con el logo vertical de Emi Studio (igual que la carga del juego).
Necesita Pillow. Lo corre Claude en su contenedor; el resultado se guarda en el repo.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

AQUI = Path(__file__).resolve().parent.parent
RES = AQUI / 'android' / 'app' / 'src' / 'main' / 'res'
LOGO = AQUI.parent / 'public' / 'img' / 'emi_studio_vertical.png'
DENSIDADES = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}

maestro = Image.open(sys.argv[1]).convert('RGBA')
if maestro.width != maestro.height:
    sys.exit('El maestro tiene que ser cuadrado.')
fondo_negro = Image.new('RGBA', maestro.size, (0, 0, 0, 255))
maestro = Image.alpha_composite(fondo_negro, maestro)

def circulo(im):
    m = Image.new('L', (im.width * 4, im.height * 4), 0)
    ImageDraw.Draw(m).ellipse((0, 0, m.width - 1, m.height - 1), fill=255)
    m = m.resize(im.size, Image.LANCZOS)
    out = im.copy()
    out.putalpha(m)
    return out

for nombre, f in DENSIDADES.items():
    carpeta = RES / f'mipmap-{nombre}'
    lado = round(48 * f)
    chico = maestro.resize((lado, lado), Image.LANCZOS)
    chico.convert('RGB').save(carpeta / 'ic_launcher.png', optimize=True)
    circulo(chico).save(carpeta / 'ic_launcher_round.png', optimize=True)
    frente = maestro.resize((round(108 * f), round(108 * f)), Image.LANCZOS)
    frente.save(carpeta / 'ic_launcher_foreground.png', optimize=True)

(RES / 'values' / 'ic_launcher_background.xml').write_text(
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#000000</color>\n</resources>\n', encoding='utf-8')

# Splash: todos los splash.png del proyecto, con su mismo tamaño.
logo = Image.open(LOGO).convert('RGBA')
for archivo in RES.glob('drawable*/splash.png'):
    w, h = Image.open(archivo).size
    lienzo = Image.new('RGBA', (w, h), (0, 0, 0, 255))
    alto = round(min(w, h) * 0.42)
    l = logo.resize((round(logo.width * alto / logo.height), alto), Image.LANCZOS)
    lienzo.alpha_composite(l, ((w - l.width) // 2, (h - l.height) // 2))
    lienzo.convert('RGB').save(archivo, optimize=True)
print('Íconos y splash listos en', RES)
