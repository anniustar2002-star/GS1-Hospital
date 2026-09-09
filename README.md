# GS1 Hospital — Tour interactivo

Versión mejorada del sitio [GS1 Hospital](https://gs1hospital.gs1.org/): en vez de presentaciones estáticas
tipo PowerPoint, cada sala ofrece una **simulación real de escaneo** con un registro de trazabilidad en vivo,
pensada para un stand de un evento de salud.

## Salas incluidas

- 💊 Farmacia Hospitalaria — dispensación segura de medicamentos (unidosis)
- 🩺 Quirófano — trazabilidad de implantes y material quirúrgico
- 🚑 Urgencias y Admisión — identificación del paciente y ruta clínica
- 🩸 Banco de Sangre — trazabilidad "vena a vena"

## Correr en local / Codespaces

```bash
npm install
npm run dev -- --host
```

Abre la URL que muestra la terminal (en Codespaces, el puerto 5173 se reenvía automáticamente).

## Stack

Vite + React + TypeScript + Tailwind CSS + React Router.
