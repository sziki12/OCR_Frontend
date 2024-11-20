# Fetching the latest node image on alpine linux
FROM node:alpine

# Setting up the work directory
WORKDIR /ocr-frontend

EXPOSE 3000

# Starting our application
CMD ["tsc","-p","/ocr-frontend"]
CMD ["npm","start"]

# Installing dependencies
COPY ocr_frontend_react/package*.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm install --loglevel verbose

# Copying all the files in our project
COPY ocr_frontend_react/src ./src
COPY ocr_frontend_react/public ./public
COPY ocr_frontend_react/postcss.config.js .
COPY ocr_frontend_react/tailwind.config.js .
COPY ocr_frontend_react/tsconfig.json .



