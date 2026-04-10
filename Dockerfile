# Etapa 1: Compilar Angular
FROM node:20 AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar Angular para dev
RUN npm run build:dev

# Etapa 2: Nginx server
FROM nginx:alpine


# Eliminar configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos compilados a la raíz
COPY --from=builder /app/dist/frontend-qp/browser /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
