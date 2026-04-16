# SMXchange

## Com llençar el servidor

Per a fer anar el programa, si esteu a windows, heu de instalar Docker Desktop

Instruccións per a instalar, junt al instalador, es troben a la documentació official <https://docs.docker.com/desktop/setup/install/windows-install/>

Un cop instalat docker, que es tan simple com seguir els pasos en el instalador amb les opcións per defecte, podeu fer anar els scripts per a engegar i apagar el servidor. engegarServior.bat i pararServidor.bat

Asegureu-vos de que la aplicació está oberta en segon pla o no funcionará el script.

Podeu apagar el servidor o tancar l'ordinador en cuansevol moment, no hi ha perdua de progrés.

Es possible que per a cambis a backend s'hagi de tancar i tornar a engegar el servidor.

EL SERVIDOR ENCARA NO ESTÁ PROBAT A WINDOWS. SI EL PROBES I ET FUNCIONA, BORRA AQUESTA LINEA.

---

## Base de dades

### Carregar la base de dades

Per iniciar la base de dades amb la informació i esquemes ja fets, s'ha d'intoduir dintre del directori /db/init els scripts .sql que es volen usar, tan els create com els inserts i totes les dades.
NO es guardará la base de dades sola quan la empenyeu a github, per a compartir el vostre progres en la base de dades l'haureu d'exportar i colocar en /db/init.
Si que es guardará a traves de inicis i parades de servidor, pero no dins del script.

### Credencials

(subjecte a cambi, el equip de DBA decideix)
Port: 3306
Root Pswd: root
Base de dades: smxchange
Usuari: user
Password: password
