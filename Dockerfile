# Usa una imagen base de Node.js basada en Alpine
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala las dependencias necesarias para GraphicsMagick, ImageMagick y Ghostscript
RUN apk update && apk add --no-cache \
  imagemagick \
  graphicsmagick \
  ghostscript \
  bash

# Copia los archivos package*.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Instala la CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del proyecto al contenedor
COPY . .

# Expone el puerto 3000 para la aplicación
EXPOSE 3000

# Usa una variable de entorno para definir el comando de inicio
CMD ["sh", "-c", "npm run ${NODE_ENV}"]
