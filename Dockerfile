FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Instala CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del proyecto
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar 
CMD ["npm", "run", "start"]
