FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Instala CLI de NestJS 
RUN npm install -g @nestjs/cli

# Copia el resto del proyecto
COPY . .

# Expone el puerto de la app
EXPOSE 3000

# Comando para iniciar en dev
CMD ["npm", "run", "start:dev"]
