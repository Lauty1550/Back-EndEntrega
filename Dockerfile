FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias de la aplicación
RUN npm install

# Instala la CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del proyecto
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Usa una variable de entorno para definir el comando de inicio
CMD ["sh", "-c", "npm run ${NODE_ENV}"]
