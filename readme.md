# Angular

### Getting Started

- Install angular cli using the command `npm install -g @angular/cli`
- Create a new project using the command `ng new <project-name>`

### Angular Core Concepts

- Components, Services
- Directives, Pipes,
- Data Binding, Event Handlers
- Http Module, Forms Module
- Routing, Animations
- Testing, Building for Production

### Generating the components

- `ng g c components/header`

### Angular services

- Angular services are used to encapsulate data, making HTTP calls, or performing any task that is not related directly to data rendering.
- `ng g service services/todos`

### Angular directives

- Directives add or change behavior in the DOM (e.g. change appearance or layout based on state).
- Generate a directive: `ng g directive directives/highlight-todo`

### Angular Pipes

- Pipes transform values in templates (e.g. format text, filter or sort lists).
- Generate a pipe: `ng g pipe pipes/filter-todo`

### Data binding

- **Interpolation:** `{{ value }}` — show component data in the template.
- **Property:** `[prop]="value"` — pass data into a child or set DOM properties.
- **Event:** `(event)="handler()"` — respond to user or DOM events.
- **Two-way:** `[(ngModel)]="value"` — sync input and component (requires `FormsModule`).

### Dependency injection

- Angular creates and injects services (and other dependencies) into components; use `inject(MyService)` or constructor injection.
- Provide services in `providedIn: 'root'` for app-wide singleton, or in component `providers` for a limited scope.

### Lifecycle hooks

- `ngOnInit` — run logic after the first change detection (e.g. load data).
- `ngOnDestroy` — clean up (e.g. unsubscribe) when the component is destroyed.

### Routing

- Define routes (path → component) in a routing module or `app.routes.ts`; use `<router-outlet>` to show the active route.
- Navigate with `routerLink="/path"` in templates or `Router.navigate()` in code.

### Standalone & signals (modern Angular)

- **Standalone components** — use `standalone: true`, import what you need in the component; no `NgModule` required for the component.
- **Signals** — use `signal()`, `computed()`, and `effect()` for reactive state; in templates call the signal as a function: `count()`.
- **Inputs/outputs** — `input()`, `input.required()`, and `output()` for component API.
