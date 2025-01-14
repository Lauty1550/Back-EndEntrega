FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar las dependencias necesarias para sharp y otras herramientas
RUN apk update && apk add --no-cache \
  bash \
  build-base \
  vips-dev \
  cairo-dev \
  pango-dev \
  jpeg-dev \
  giflib-dev \
  librsvg-dev \
  imagemagick \
  graphicsmagick \
  ghostscript \
  && rm -rf /var/cache/apk/*  # Limpiar la cache para reducir el tamaño de la imagen

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
