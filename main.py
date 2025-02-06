import json
import os

# Ruta al archivo donde se guardarán las tareas
archivo_tareas = "tareas.json"

# Cargar las tareas desde el archivo JSON (si existe)
def cargar_tareas():
    if os.path.exists(archivo_tareas):
        with open(archivo_tareas, "r") as archivo:
            return json.load(archivo)
    return []

# Guardar las tareas en el archivo JSON
def guardar_tareas(tareas):
    with open(archivo_tareas, "w") as archivo:
        json.dump(tareas, archivo, indent=4)

# Mostrar todas las tareas
def mostrar_tareas(tareas):
    if len(tareas) == 0:
        print("No hay tareas.")
    else:
        print("\nTareas:")
        for i, tarea in enumerate(tareas, start=1):
            estado = "Completada" if tarea["completada"] else "Pendiente"
            print(f"{i}. {tarea['descripcion']} - {estado}")

# Agregar una nueva tarea
def agregar_tarea(tareas):
    descripcion = input("Ingrese la descripción de la tarea: ")
    tarea = {
        "descripcion": descripcion,
        "completada": False
    }
    tareas.append(tarea)
    print(f"Tarea '{descripcion}' agregada.")

# Eliminar una tarea
def eliminar_tarea(tareas):
    mostrar_tareas(tareas)
    try:
        tarea_a_eliminar = int(input("Ingrese el número de la tarea a eliminar: ")) - 1
        if 0 <= tarea_a_eliminar < len(tareas):
            tarea_eliminada = tareas.pop(tarea_a_eliminar)
            print(f"Tarea '{tarea_eliminada['descripcion']}' eliminada.")
        else:
            print("Tarea no válida.")
    except ValueError:
        print("Por favor, ingrese un número válido.")

# Marcar una tarea como completada
def completar_tarea(tareas):
    mostrar_tareas(tareas)
    try:
        tarea_a_completar = int(input("Ingrese el número de la tarea para marcar como completada: ")) - 1
        if 0 <= tarea_a_completar < len(tareas):
            tareas[tarea_a_completar]["completada"] = True
            print(f"Tarea '{tareas[tarea_a_completar]['descripcion']}' marcada como completada.")
        else:
            print("Tarea no válida.")
    except ValueError:
        print("Por favor, ingrese un número válido.")

def mostrar_menu():
    print("\nMenu:")
    print("1. Ver tareas")
    print("2. Agregar tarea")
    print("3. Eliminar tarea")
    print("4. Marcar tarea como completada")
    print("5. Salir")

def main():
    tareas = cargar_tareas()
    
    while True:
        mostrar_menu()
        try:
            opcion = int(input("Seleccione una opción: "))
            if opcion == 1:
                mostrar_tareas(tareas)
            elif opcion == 2:
                agregar_tarea(tareas)
            elif opcion == 3:
                eliminar_tarea(tareas)
            elif opcion == 4:
                completar_tarea(tareas)
            elif opcion == 5:
                guardar_tareas(tareas)
                print("Gracias por usar el gestor de tareas.")
                break
            else:
                print("Opción no válida. Intente de nuevo.")
        except ValueError:
            print("Por favor, ingrese un número válido.")

if __name__ == "__main__":
    main()
