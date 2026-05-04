@echo off
echo Començant El servidor, aseguret de que docker está funcionant en el fons

docker compose up -d

echo Si no has vist cap error, el servidor está engegat! Pots obrirlo a http://localhost:80 
echo També pots fer una connexió amb la base de dades en el port 3306
echo Pots tancar aquesta finestra
pause