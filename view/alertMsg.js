module.exports.alertMsg =function(message, url)
{
    return `
    <!DOCTYPE html>
    <html lang="ko">
        <head>
            <title>Alert M<essage</title>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
                var message = '${message}';
                var returnUrl = '${url}';
                alert(message);
                document.location.href = returnUrl;
            </script>
        </body>
        </head>
        `;
}