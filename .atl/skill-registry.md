# Skill Registry — quanta-administrador-frontend

Generated: 2026-10-07

## User Skills (trigger table)

| Skill | Trigger |
|-------|---------|
| branch-pr | Crear/abrir un PR o preparar cambios para review |
| chained-pr | PR > 400 líneas cambiadas; PRs encadenados/stacked |
| work-unit-commits | Implementar cambios, preparar commits, partir PRs |
| issue-creation | Crear issue de GitHub, reportar bug, pedir feature |
| comment-writer | Redactar comentarios de PR/issue/review/Slack |
| cognitive-doc-design | Escribir guías, READMEs, RFCs, docs de arquitectura |
| judgment-day | "judgment day", "doble review", "juzgar" |
| skill-creator | Crear un skill nuevo |
| impeccable | Diseñar/criticar/pulir UI frontend |
| emil-design-eng | Pulido de UI, animaciones, detalles de componentes |

(go-testing no aplica: el proyecto es Angular/TS.)

## Compact Rules

### Angular / TS (src/app/**/*.ts, *.html)
- Angular 19 standalone components; cada componente declara su propio `imports`. Sin NgModules salvo `CoreModule` (legacy).
- UI con PrimeNG 19 + Tailwind; replicar patrones de `licences`/`companies`/`users` (tablas densas, drawers/diálogos para CRUD, toasts).
- Estado: NgRx por feature en `features/<f>/state/{actions,effects,reducers,selectors}` con barrels `index.ts`; `LayoutService` usa signals.
- Estructura: `core/` (singletons, models, enums, guards, interceptors), `features/<f>/{pages,components,state,utils}`, `shared/components`.
- Prettier + ESLint 9 (`eslint.config.js`, `.editorconfig`). Respetar estilo vecino.
- Idioma de UI/textos: español.

### Repo-specific constraints (preferencias del usuario)
- NO escribir specs ni correr tests (jest) en este repo.
- NO correr build después de cambios.
- Conventional commits, sin Co-Authored-By ni atribución IA.
- Ramas desde `dev`; PRs a `dev`.

## Project Conventions
- `.github/copilot-instructions.md` — patrones de arquitectura (standalone, NgRx, layout, PrimeNG theme)
- `PRODUCT.md` — contexto de producto/diseño (consistencia > novedad, sin estética marketing)
- `README.md`
