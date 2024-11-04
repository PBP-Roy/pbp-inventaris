<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database</title>
</head>
<body>h
    <h1>TESTING DATABASE</h1>
    <article>
        <h3>user</h3>
        @foreach ($Item as $Item)
        <p>{{ $Item['Buku'] }}</p>
        @endforeach

    </article>
</body>
</html>