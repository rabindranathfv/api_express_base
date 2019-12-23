# api_express_base

Boilerplate based API Structure projects for nodeJs/Express. Include mongoDB

+ always use camelCase
+ ES6, ES7 Javascript standards
+ check [angular style](https://angular.io/guide/styleguide) guide if you want more details
+ all code must be in english!

### Information Important

1. [Project structure](#projectstructure)
2. [Routing](#routing)
3. [LazyLoad](#lazyload)
4. [Views](#views)
5. [Services](#services)
6. [Componentes](#components)
7. [Interfaces](#interfaces)
8. [Directives](#directives)
9. [Pipes](#pipes)
10. [Internationalization - I18n](#i18n)
11. [Enviroments for building process](#enviroments)
12. [Style](#style)
13. [Assets](#assets)
14. [Interceptor](#interceptor)
15. [Mock data](#mockdata)

## Project Structure
<a name="projectstructure"/>

The structure of this project defined by folders with specific purpose

```
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss 
│         ├── _mixins.scss      # mixing scss 
│         ├── _variable.sccs    # global variables for styles     
│   └── ...                     # etc.
├── helpers                     # helpers scripts for back for front
├── logs                        # logs for request in back for front
├── redis                       # redis connection, models, etc
├── socket                      # socket io implementation back for front
├── www                         # build angular application
└──...
```

## Routing
<a name="routing"/>
We normally use 2 lvls of routing, the firts one is at the same lvl of `app.module.ts`, this is our main routing and inside we delegate routing to views module using lazyload approach.

```javascript
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [LogedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    /* canActivate: [LogedGuard] */
  },
  {
    path: 'centro-control',
    loadChildren: 'src/app/view/center-control/center-control.module#CenterControlModule',
    data: { title: 'Centro de control', resource: 'control', type: 'control' },
    /* canActivate: [LoginGuard] */
  },
  .
  .
  .
  .
  .
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];
```

the most important about this is the way we make the lazyload and stuff we send into each view.
```javascript
{
    path: 'opciones',
    loadChildren: 'src/app/view/options/options.module#OptionsModule',
    data: { title: 'Opciones', resource: 'options', type: 'options', url: 'base' },
    /* canActivate: [LoginGuard] */
}
```

+ **path** is full route of the view.
+ **loadChildren** with full path, do not use relative.
+ **data** title is basic the name of the view, resource and type are used for interaction inside components, templates and services operations and url is data for ` breadcrumb component ` (use this url for construct the route for final users).

Inside each view existing in the application we define a secondary route handle for child rutes, just follow the path define in loadChildren parameter. Remenber check `_nav.ts` because is related to this file.

## LazyLoad
<a name="lazyload"/>

We use 2 lvls of routing, for this example we are going to use `centro-control`view 

```javascript
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [LogedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    /* canActivate: [LogedGuard] */
  },
  {
    path: 'centro-control',
    loadChildren: 'src/app/view/center-control/center-control.module#CenterControlModule',
    data: { title: 'Centro de control', resource: 'control', type: 'control' },
    /* canActivate: [LoginGuard] */
  },
  .
  .
  .
  .
  .
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];
```
now we need to go inside view folder with `center-control` with this structure

```javascript
├── view                                    
│  ├── center-control               # view folder with route 'centro-control'
│     ├── center-control             
│         ├── html                  # html file of specific component 
│         ├── spec                  # spec file of specific component
│         ├── scss                  # scss file of specific component
│         ├── ts                    # ts file of specific component
│      ├── center-control-details   # Main files of ang app
│         ├── html                  # html file of specific component 
│         ├── spec                  # spec file of specific component
│         ├── scss                  # scss file of specific component
│         ├── ts                    # ts file of specific component
├── routing.module.ts               # here we handle the lazyload and all routes of this view
├── .module.ts                       # the module for import routing, components or another modules we are going to use
│   └── ...                         # etc.
└──...
```

the sctruture of routing inside is

```javascript
const routes: Routes = [
  {
    path: '',
    component: CenterControlComponent
  },
  {
    path: ':id/detalles',
    component: CenterControlDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterControlRoutingModule { }
```
+ base path is always is empty
+ the rest of the routes use the base route in main `app-routing.module.ts` with new routes inside child

## Views
<a name="views"/>

All views must be add inside a view folder

```javascript
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│           ├── viewFolder1  
│           ├── viewFolder2  
│           ├── viewFolder3  
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```
inside always you are going to have name of the view with routing.module.ts and <nameView>.module.ts with severals folders inside for all the views related with this base path.

## Services
<a name="services"/>

The most important here is make the request to API without apply map or another methods based in js

```javascript
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│           ├── serviceFolder   # view defined into routing module
│             ├── <name>.service.ts
│             ├── <name>.service.spec.ts
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```
Use observables! we don't apply map or another high order functions inside the service, we manipulate data inside view, components, etc

```javascript
public getExemple( id: number, resource: string ): Observable<any> {
    return this.http.get(`${environment.url}/${resource}/${id}`)
               .pipe(catchError(this.handleError));
  }
```
+ checkout about behaviors from rxjs!

## Components
<a name="components"/>

The most import for creation of componentes is:
+ the always have some inputs,output or boths (depends on the solution).
+ subscribe method direct from service.
+ Apply javascript high order function for handle data (map, foreach, filter, reduce, rxjs operators, etc).
+ the style of component always is using .scss combine angular material and clases define into style folder or into `style.sccs`.
+ the name of the component must be descriptive and neutral.
+ each component should be the most dynamic possible.
+ Use flexbox, css grid and another stuff into .scss
+ Avoid use inline css into html file
+ the methods inside component must be verbose enought and easy to understand

## Interfaces
<a name="interfaces"/>

We define interfaces for more control into application and we always create a folder for each interface use the `export` statement. if this folder doesn't exist create one

```javascript
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│           ├── <name>   
│             ├── <name>.interface.ts
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

one example of interface is: 

```javascript
export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    minlength?: number;
    required?: boolean;
    disabled?: boolean;
    typeAttribute?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
}
```

## Directives
<a name="directives"/>

We define a `directives.module.ts` for import all directives and reuse in any place. if this folder doesn't exist create one

```javascript
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│           ├── <name>   
│             ├── <name>.directive.ts
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

## Pipes
<a name="pipes"/>

We define a `pipes.module.ts` for import all directives and reuse in any place. if this folder doesn't exist create one

```javascript
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│           ├── <name>   
│             ├── <name>.pipe.ts
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json 
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

## Internazionalization - I18n
<a name="i18n"/>

```javascript
.
├── ...
├── api                     
├── auth                    
├── client                      # angular application
│   ├── e2e                     # e2e test
│   ├── src                     # Main files of ang app
│      ├── app                  
│         ├── components        # all components with their own module for easy import 
│         ├── directives        # Directives Module
│         ├── pipes             # Pipe Module
│         ├── guard             # guards for User roles access
│         ├── interceptor       # interceptor for handle request
│         ├── interfaces        # all interfaces define by part you need, models 
│         ├── services          # Service request for API or Severals APIs
│         ├── view              # view defined into routing module
│         ├── _mock-datas.ts    # all definitions of data mock is here
│         ├── _nav.ts           # definition for sidebar navigation
│      ├── assets               # Assets include imgs, css, icons, img and most import i18n en.json, es.json
│           ├── i18n   
│             ├── es.json       # support all spanish texts, labels, etc
│             ├── en.json       # support all english texts, labels, etc
│      └── ...                     # etc.
│      ├── enviroments          # settings for dev, stagging and productions for API
│      ├── style                # FILES .scss     
│   └── ...                     # etc.
└──...
```

if you add a new view into module you must add the requirements for use internationalization with [ngx-traslate](https://github.com/ngx-translate/core)

Remenber imports necessary stuff, and add this into imports array in this way:
```
TranslateModule.forChild({
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    },
      isolate: false
  }),
```

and at this one at the end of the module, after export class statement

```
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
```

## Enviroments
<a name="enviroments"/>

We define 3 files for this: production, staging and Dev

 Production for build you are going to use this file `./build.sh`

```javascript
export const environment = {
  production: true,
  url: 'http://x.x.x.x:5000/api/',
  token: '123',
};
```

Production for build you are going to use this file `./build_staging.sh`

```javascript
export const environment = {
    production: true,
    environmentName: 'staging',
    url: 'http://x.x.x.x:5000/api/',
    token: '123',
};
```


## Style
<a name="style"/>

+ Define clear css, scss or sass implementation.
+ create verbose clases, ids, selectors.
+ Remenber use flexbox, css grid, or both.
+ avoid to use position:  absolute property (just necesary cases).
+ remenber use mixin based on flexbox, and if u need create new one go head.
+ text better setup usin em units.
+ use viewport units for layaouts (vw, vh, vhmax, vwmax).
+ use colors just in hexadecimal representation
+ check flexlayout implementation used into main content on our application. [Documentation](https://github.com/angular/flex-layout)

## Assets
<a name="assets"/>

Inside this folder exist imgs, icons, js and another files
+ Try to use png, or svg insted jpg or another format
+ use dynamic routes for apply or use all assets

## Interceptor
<a name="interceptor"/>

This is triggered just for all request and is combinend with loading component. check it, if you need get more deep

## mock data
<a name="mockdata"/>

this exist into `_mock-datas.ts`, if you need use or check some formats this is the file!!
