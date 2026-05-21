FROM node:20

WORKDIR /var/www/app

# Copiar primero archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar resto del proyecto
COPY . .

# RUN npm build 

EXPOSE 3000

CMD ["npm", "run", "dev"]