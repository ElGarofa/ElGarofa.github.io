import os
import shutil
from datetime import datetime

# Carpetas destino por tipo de archivo
CATEGORIAS = {
    "Imágenes": [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
    "Documentos": [".pdf", ".docx", ".doc", ".txt", ".odt", ".xlsx", ".pptx"],
    "Música": [".mp3", ".wav", ".ogg"],
    "Videos": [".mp4", ".mkv", ".avi"],
    "Código": [".py", ".js", ".html", ".css", ".php", ".sql", ".c", ".cpp"],
    "Comprimidos": [".zip", ".rar", ".7z", ".tar", ".gz"],
    "Instaladores": [".exe", ".msi", ".apk"],
    "Otros": []
}

LOG_FILE = "organizer_log.txt"

def detectar_categoria(nombre_archivo):
    ext = os.path.splitext(nombre_archivo)[1].lower()
    for categoria, extensiones in CATEGORIAS.items():
        if ext in extensiones:
            return categoria
    return "Otros"

def organizar_carpeta(origen, simular=False):
    movimientos = []

    for archivo in os.listdir(origen):
        ruta_archivo = os.path.join(origen, archivo)
        if os.path.isfile(ruta_archivo):
            categoria = detectar_categoria(archivo)
            carpeta_destino = os.path.join(origen, categoria)

            if not os.path.exists(carpeta_destino):
                if not simular:
                    os.makedirs(carpeta_destino)

            destino_final = os.path.join(carpeta_destino, archivo)

            if not simular:
                shutil.move(ruta_archivo, destino_final)

            movimientos.append((ruta_archivo, destino_final))

    return movimientos

def guardar_log(movimientos):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"\n--- Organizado el {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ---\n")
        for origen, destino in movimientos:
            f.write(f"MOVIDO: {origen} → {destino}\n")

def revertir_log():
    if not os.path.exists(LOG_FILE):
        print("❌ No se encontró un log anterior.")
        return

    with open(LOG_FILE, "r", encoding="utf-8") as f:
        lineas = f.readlines()

    movimientos = []
    for linea in lineas:
        if linea.startswith("MOVIDO:"):
            partes = linea.strip().split("MOVIDO: ")[1].split(" → ")
            if len(partes) == 2:
                movimientos.append((partes[0], partes[1]))

    for origen, destino in reversed(movimientos):
        if os.path.exists(destino):
            try:
                shutil.move(destino, origen)
                print(f"↩️ Revertido: {destino} → {origen}")
            except Exception as e:
                print(f"⚠️ Error al mover {destino}: {e}")
        else:
            print(f"❌ No se encuentra el archivo para revertir: {destino}")

def menu():
    print("\n🧠 Smart Organizer v1.0")
    print("1. Organizar carpeta")
    print("2. Simular organización")
    print("3. Revertir último log")
    print("4. Salir")

    eleccion = input("Seleccione una opción: ").strip()

    if eleccion in {"1", "2"}:
        ruta = input("Ingrese la ruta absoluta o relativa de la carpeta a organizar: ").strip()
        if not os.path.isdir(ruta):
            print("❌ Carpeta no válida.")
            return

        simular = eleccion == "2"
        movs = organizar_carpeta(ruta, simular=simular)

        if not movs:
            print("✅ No hay archivos para mover.")
        else:
            if simular:
                print("📦 Simulación completada. Se moverían:")
            else:
                guardar_log(movs)
                print("📦 Organización completada. Se movieron:")

            for origen, destino in movs:
                print(f"→ {os.path.basename(origen)} → {os.path.dirname(destino)}")

    elif eleccion == "3":
        revertir_log()
    elif eleccion == "4":
        print("👋 Saliendo...")
        exit()
    else:
        print("❌ Opción no válida.")

# --- Main ---
if __name__ == "__main__":
    while True:
        menu()
