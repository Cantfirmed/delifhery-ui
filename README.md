# DelifheryGui

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Implementierung der geforderten Funktionalitat

- Ansprechendes Design des Web Frontends (hier geht es weniger um das Aussehen selbst,
  sondern um die ubersichtliche Darstellung, Darstellung nur sinnvoller Daten, sowie logi-
  scher, intuitiver und einfacher Ablaufe fur Benutzer*innen; “Benutzbarkeit”) Achtung: Die
  Benutzer*innen sind nicht die Entwickler\*innen selber!
- Webanwendung mit Angular (Version >= 20), welche mit dem Backend uber REST-Service-
  Schnittstellen kommuniziert. Die Services zum Backend durfen NICHT generiert werden.
- Auswahl und Einsatz geeigneter CSS-Frameworks, bzw. Angular Komponenten Bibliothe-
  ken (Bootstrap, Fomantic, Angular Material, DevExtreme, etc.).
- Auswahl und Einsatz geeigneter Services fur OAuth-Login (KeyCloak, IdentityServer etc.).
- (Sinnvoller) Einsatz von zusa tzlichen Angular-Konzepten wie Pipes, Direktiven, Modulen,
  etc. (siehe z.B. Angular Dokumentation), die nicht in der Übung verwendet wurden.
- Code-Dokumentation (wo sinnvoll)
- Dokumentation wie oben in der WEA5-Sektion beschrieben

## Libraries/Frameworks used

- Tailwind CSS
- DaisyUI

## Aufbau

- Angular Components in src/app
- Alles andere in src/shared
  - models: DTOs als interface models
  - auth: Alles keycloak-js
    - Meiste kopiert aus einem Medium Blog
    - angular-keycloak wurde noch nicht auf Angular 21 geupdated deswegen einfach nur keycloak-js
  - services: Services

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
