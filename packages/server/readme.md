# Proyecto apollo typed lambda

+ typescript
+ apollo-server 2
+ serverless-offline
+ graphql-code-generator
+ merge-graphql-schemas
+ Dependency injection con `injection-js`

## Requisitos

```
yarn global add serverless
```

## Instalación

Clone el repositorio  `npm install`

```
git clone https://github.com/NgPanama/NgPanama.git
yarn install
```

## Iniciar el servidor localmente

```
yarn start
```

El servidor se ejecutará en el puerto 3000. Puede cambiar esto editando el archivo de configuración.

## Formato del codigo


Usamos Prettier y Tslint para formatear y aplicar estándares en nuestro código.
Ambos se ejecutarán en el proyecto automáticamente antes de cada commit. </br>

Prettier reescribe el código de acuerdo con el archivo de configuración .prettierrc.json. </br>
Si desea activar prettier manualmente (en todos los archivos .ts dentro de la carpeta src) sin comprometerse, ejecute: </br>

```
yarn prettier
```

Tslint verificará las reglas encontradas en el archivo de configuración tslint.json. <br/>
Si desea verificar tslint manualmente (en todos los archivos .ts dentro de la carpeta src) sin comprometerse, ejecute: </br>

```
yarn tslint
```

## Ejecute el servidor en producción en AWS lambda

Con el siguiente comando se genera el deployment a AWS
```
yarn deploy
```
