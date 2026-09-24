# GS1 Hospital — Plan de trabajo y checkpoints

> Documento de referencia para retomar el proyecto. No se ejecuta nada de lo
> listado en "Pendiente" hasta que se indique explícitamente — este archivo
> es solo el plan guardado en el repo.

## 1. Qué es esta app

Réplica mejorada del sitio [gs1hospital.gs1.org](https://gs1hospital.gs1.org/),
pensada para mostrarse en una pantalla táctil / kiosco en un evento de salud.
Ya no es un recorrido por salas independientes (como el diseño original):
es **un solo ciclo** que muestra el ingreso de un paciente al hospital, de
principio a fin, con la cadena de suministro del medicamento como una rama
aparte que se une al ciclo. Cada paso se puede tocar para ver qué estándar
GS1 aplica ahí, y se puede completar con un escaneo real (pistola lectora
USB/Bluetooth) o simulado.

**Stack:** Vite + React + TypeScript + Tailwind CSS. Sin backend, sin base
de datos — todo el contenido vive en `src/data/cycle.ts`.

**Cómo correrlo (Codespaces o local):**
```bash
npm install
npm run dev -- --host
```

## 2. Checkpoint A — Lo que ya está hecho

### 2.1 Estructura del ciclo
- `src/data/cycle.ts` define dos listas de pasos (`CyclePhase[]`):
  - `mainPhases` (6): Sala de Emergencia → Ingreso/Triaje → Habitación →
    Enfermería → Administración al paciente → Alta del paciente.
  - `supplyBranch` (3): Llega el camión al depósito → Depósito despacha a
    Farmacia → Farmacia traslada a Enfermería. Se conecta al ciclo
    principal justo antes de "Enfermería".
- `src/components/CycleFlow.tsx` dibuja el flujo horizontal con flechas,
  la rama de suministro centrada arriba, y las ilustraciones como ícono de
  cada tarjeta (sin caja/borde, "flotando" sobre el fondo).
- `src/components/PhaseModal.tsx` es la ventana emergente que abre cada
  tarjeta: descripción, badges de estándares GS1 (con tooltip explicativo,
  se abren hacia abajo), y la zona de escaneo.

### 2.2 Escaneo con pistola lectora real (no cámara)
- El modal empieza escuchando de inmediato al abrir (no hay botón previo
  que tocar antes de escanear).
- Un banner de color arriba del cuadro de texto dice explícitamente **qué
  escanear** en esa estación (`phase.scanLabel`).
- Hay un `<input>` visible y siempre enfocado: la pistola lectora "escribe"
  ahí como si fuera un teclado (HID) y manda Enter al terminar. El cuadro
  muestra el código en vivo mientras se escanea.
- Cada fase tiene `expectedCodes: string[]` — el código se valida contra
  el real (mayúsculas/minúsculas no importan). Si no coincide, error en
  rojo y se puede reintentar. Si coincide, se revela `capturedFields`
  (los datos de ejemplo: GTIN, lote, caducidad, etc.).
- Pasos que necesitan **más de un escaneo** (ej. "Administración al
  paciente" pide pulsera del paciente + medicamento) usan
  `requireAll: true` + `codeLabels: string[]` — se ve un checklist con
  cada código pendiente/hecho, en cualquier orden.
- Hay un botón "¿Sin lector a la mano? Simular escaneo correcto" para
  probar sin pistola física (dev/demo).

### 2.3 Códigos reales confirmados (decodificados del documento del usuario)
No inventados — coinciden con los códigos de barras ya impresos:
| Estación | Código exacto que se escanea |
|---|---|
| Sala de Emergencia / Ingreso-Triaje / Alta del paciente | `8412039951002` (misma pulsera, sin prefijo "GSRN:") |
| Habitación | `7501234009981` |
| Llega el camión al depósito | `750123456000000012` |
| Depósito despacha a Farmacia | `07501234567895` |
| Enfermería / Farmacia traslada a Enfermería / mitad de Administración | `07501234567895271231L2A409888213` (unidosis: GTIN+caducidad+lote+serie pegados, sin paréntesis ni números de AI) |

### 2.4 Ilustraciones
- `public/illustrations/` — una imagen por paso (PNG con fondo removido
  vía flood-fill, o SVG que ya venía transparente). Provistas por el
  usuario, no son las de gs1hospital.gs1.org original (evita usar arte de
  terceros).
- Se muestran a tamaño grande, sin caja/borde alrededor — es la tarjeta
  misma, con su texto debajo.

### 2.5 Detalles de layout resueltos
- Página ancha (`max-w-[1800px]`) para pantallas grandes/kiosco, sin
  llegar a ocupar el 100% del ancho.
- Grid de 6 columnas para el ciclo principal + rama de suministro
  centrada arriba (usando flexbox, no grid-column-span, para que quede
  realmente centrada).
- Modal grande (`max-w-2xl`, `p-10`), pensado para dedo/touch, no mouse.

## 3. Checkpoint B — Pendiente: logos, tipografía y colores

**Archivos ya en el repo:** `Logos/LOGO CON RIF 2000 PX.png` (a color, para
fondo claro) y `Logos/LOGO BLANCO CON RIF.png` (blanco, para fondo oscuro).
Ambos confirmados legibles.

**Falta decidir/hacer:**
- [ ] Dónde va el logo (encabezado, pie de página, dentro de cada modal,
      o combinación) — pendiente de respuesta del usuario.
- [ ] Mover los logos de `Logos/` a `public/` (o `src/assets/`) para que la
      app los sirva.
- [ ] Definir tipografía de marca (actualmente Tailwind default / system
      font, sin definir en `src/index.css`).
- [ ] Definir paleta de colores de marca GS1 (azul marino + naranja, según
      el logo) y aplicarla consistentemente — hoy cada fase usa un color
      Tailwind genérico (`bg-rose-500`, `bg-amber-500`, etc.) sin relación
      con la identidad de marca.
- [ ] Revisar contraste/legibilidad tras el cambio de paleta.

## 4. Checkpoint C — Pendiente: responsive

Hoy la app está optimizada para pantalla grande tipo kiosco/monitor
(`max-w-[1800px]`, grid fijo de 6 columnas). Falta:
- [ ] Definir breakpoints objetivo (¿solo kiosco + tablet, o también
      celular?) — según el uso real en el evento.
- [ ] `CycleFlow.tsx`: el grid de 6 columnas necesita un modo apilado o de
      scroll horizontal en pantallas angostas (hoy no tiene fallback).
- [ ] `PhaseModal.tsx`: revisar que el modal (`max-w-2xl`) no se corte en
      pantallas chicas, y que el checklist/banner sigan legibles.
- [ ] Probar en al menos: monitor de kiosco (horizontal, grande), tablet
      (portrait y landscape), y celular como mínimo viable.

## 5. Checkpoint D — Pendiente: empaquetado como app de escritorio (Electron)

- [ ] Decidir plataforma(s) objetivo (Windows/macOS/Linux — probablemente
      solo Windows para el kiosco del evento).
- [ ] Agregar Electron al proyecto (`electron`, `electron-builder` o
      `electron-forge`) sin romper el build de Vite actual.
- [ ] Configurar modo kiosco (pantalla completa, sin barra de navegación,
      posiblemente sin salir con Alt+F4 durante el evento).
- [ ] Definir si necesita conexión a internet (hoy no — todo es estático,
      así que corre offline una vez empaquetado) o si se mantiene como
      página web servida localmente dentro del wrapper de Electron.
- [ ] Generar el instalador/ejecutable final y probarlo en la máquina real
      del evento (incluyendo que la pistola lectora funcione igual que en
      el navegador).

## 6. Orden acordado

1. **Documentar** (este archivo) ✅
2. **Logos, tipografía y colores** — siguiente paso, pendiente de
   decisión del usuario sobre ubicación de logos.
3. **Responsive** — después de que el branding esté aprobado.
4. **Empaquetado en Electron** — al final, una vez probado en navegador.

No avanzar al siguiente checkpoint sin confirmación explícita del usuario.
