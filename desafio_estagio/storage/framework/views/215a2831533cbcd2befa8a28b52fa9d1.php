<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contract-me</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
    <style>

        #app {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>


<id id="app" ></id>


<?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
<?php echo app('Illuminate\Foundation\Vite')('resources/js/app.js'); ?>

</body>
</html><?php /**PATH /opt/lampp/htdocs/Desafio_Estagio/desafio_estagio/resources/views/welcome.blade.php ENDPATH**/ ?>