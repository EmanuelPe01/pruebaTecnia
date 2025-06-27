<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mi Sistema de Telas</title>
    <base href="/app/">

    {{-- CSS compilado por Angular --}}
    <link rel="stylesheet" href="{{ asset('angular/styles.css') }}">
</head>
<body>
    {{-- El componente raíz de Angular --}}
    <app-root></app-root>

    {{-- JS compilado por Angular --}}
    <script src="{{ asset('angular/runtime.js') }}"></script>
    <script src="{{ asset('angular/polyfills.js') }}"></script>
    <script src="{{ asset('angular/main.js') }}"></script>
</body>
</html>
