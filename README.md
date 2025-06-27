<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Requisitos

## Requisitos del sistema

- **PHP** 8.2.16
- **Node.js** 18.18  
- **npm** 10.1.0
- **Angular** 16.2.16
- **TypeScript** 5.1.6   
- **Composer** 2.6.4 (descarga desde [https://getcomposer.org/download](https://getcomposer.org/download))


## Antes de comenzar

1. Clona el repositorio a tu máquina local.
2. Navega a la carpeta del proyecto en la línea de comandos.
3. Crear un archivo `.env`, copiar el ejemplo `.env.example` y configurar las variables de conexión con la base de datos.
4. Se debe crear una base de datos en MySQL con el nombre `tienda_telas`.
5. Instalar todas las dependencias necesarias con:
   ```bash
   composer install
````

6. Ejecutar el siguiente comando para generar las tablas necesarias:

   ```bash
   php artisan migrate
   ```

## Frontend (Angular)

El frontend del sistema se encuentra en la carpeta:

```
/frontEnd/pruebaTecnica_front
```

### Compilación del frontend

1. Navega a la carpeta del frontend:

   ```bash
   cd frontEnd/pruebaTecnica_front
   ```

2. Ejecuta el build de producción:

   ```bash
   ng build --configuration production
   ```

3. El contenido generado en `/dist/prueba-tecnica-front/` será copiado automáticamente a la carpeta:

   ```
   /public/angular
   ```

> Esta configuración se hace modificando el archivo `angular.json` para que el `outputPath` sea `../../public/front`.

### Referencia desde Laravel

Desde la vista `resources/views/welcome.blade.php`, se incluye el frontend usando:

```blade
    {{-- El componente raíz de Angular --}}
    <app-root></app-root>

    {{-- JS compilado por Angular --}}
    <script src="{{ asset('angular/runtime.js') }}"></script>
    <script src="{{ asset('angular/polyfills.js') }}"></script>
    <script src="{{ asset('angular/main.js') }}"></script>
```

## Para visitar la página del sistema

7. Ejecuta el siguiente comando para iniciar el servidor local:

   ```bash
   php artisan serve
   ```
8. Abre tu navegador y visita el siguiente enlace: 
    http://localhost:8000/app
