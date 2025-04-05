FROM node:alpine
WORKDIR /app
COPY package* ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ] ; then \
    npm install; \
    else \
    npm install --only=production;\
    fi
COPY . .
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm run build; \
    fi
EXPOSE 9000
CMD ["npm","run","start"]