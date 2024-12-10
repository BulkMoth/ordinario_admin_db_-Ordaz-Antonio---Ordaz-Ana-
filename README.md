ORDINARIO: 
ANA PAOLA GOMEZ HEREDIA-JOSÉ ANTONIO ORDAZ PÉREZ 

LEVANTAR EL CONTENEDOR:
docker comppose up

ENTRAR A MYSQL:
sudo docker exec -it 7b8d68dc19dc bin/bash
mysql -p
contraseña

VER BSD Y TABLAS;
use ordinario_modelo_admin
select * from (tabla)

VERIFICAR SI NODE Y MYSQL2 ESTAN INSTALADOS
node -v
vpm -v

INSTALACIÓN DE NODE
npm init -y

INSTALAR LAS DEPENDECIAS: npm install

INICIAR EL SERVIDOR CON: Node app.js
La API está disponible en http://localhost:3000.

