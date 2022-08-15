# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.
Check out the hosted version here on [Github Pages](https://clodus-nt.github.io/angular-nixFlix/).

## Objective

Using Angular, built the client-side for an application called myFlix based on an existing server-side code (REST API and database).

## User Stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.
- As a user, I want to be able to update and/or delete my profile.

## Key Features
- The app displays a welcome view where users can either login or register an account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will see a single movie dialog box open. The single movie view allows you to:
  - A button that opens a dialog box with information on the director
  - A button that opens a dialog box with information about the genre
  - A button that allows the user to add the movie to their list of favorites
- A profile icon in the navbar that takes the user to a profile view that allows them to:
  - Update their profile information
  - Delete their profile
  - View a list of their favorite movies and remove them if desired

## Tech Specs
- Written in Angular using Typescript
- Requires the latest verion on Node.js and npm package
- Styled and designed using Angular Material
- Contains Typedoc comments
- Hosted on [Github Pages](https://clodus-nt.github.io/angular-nixFlix/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
