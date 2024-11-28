# 使用 Node.js 镜像构建
FROM node:18 as build

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY package.json package-lock.json ./ 
RUN npm install 

# 复制项目的所有文件到容器
COPY . ./

# 构建项目
RUN npm run build 

# 使用 Nginx 运行应用
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]