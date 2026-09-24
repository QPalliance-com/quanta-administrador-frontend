# Product

## Register

product

## Users

Personal interno de RH/administración de Quanta (QP Alliance) que gestiona la configuración de la plataforma: empresas, usuarios, licencias, y catálogos operativos como el calendario de días no laborables. Usan el panel en jornada laboral, en escritorio, para tareas administrativas puntuales (crear/editar/consultar registros), no exploración casual.

## Product Purpose

Panel administrativo interno para operar y configurar la plataforma Quanta (multi-empresa, RH, costeo de producción). El calendario de días no laborables alimenta el costeo al definir qué fechas del año no se consideran laborables. Éxito = las tareas CRUD se completan rápido, sin ambigüedad, con feedback claro de éxito/error.

## Brand Personality

Funcional, clara, sin fricción. Sigue la convención visual ya establecida en el repo (Angular standalone + PrimeNG + Tailwind, patrón de `licences`/`companies`/`users`): tablas densas, diálogos/drawers para CRUD, toasts para feedback. No hay identidad de marca explorativa más allá de la paleta PrimeNG configurada — consistencia con lo existente prima sobre expresión visual nueva.

## Anti-references

Nada "marketing-y": sin heroes, sin ilustraciones decorativas, sin gradientes ni glassmorphism. La prioridad es legibilidad de datos y velocidad de tarea, no impacto visual. Evitar cualquier patrón que no exista ya en el repo salvo que resuelva una necesidad funcional concreta del ticket.

## Design Principles

- Consistencia antes que novedad: replicar los patrones ya validados en `licences`, `companies`, `users` en vez de introducir nuevos.
- Los estados (loading, error, vacío) son parte del feature, no un extra — deben cubrirse siempre.
- Cada acción destructiva o irreversible (eliminar, sobrescribir en batch) pide confirmación explícita.
- El feedback de éxito/error es inmediato y específico (toast con mensaje real del backend, no genérico).
- Fechas siempre en formato/zona Colombia, nunca el pipe `date` nativo de Angular.

## Accessibility & Inclusion

WCAG AA estándar: contraste de texto, foco visible en controles interactivos, labels asociados a inputs, confirmación accesible antes de acciones destructivas. Sin requerimiento adicional conocido más allá del estándar.
