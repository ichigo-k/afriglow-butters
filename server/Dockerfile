FROM node:alpine
WORKDIR /app
COPY package* ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ] ; then \
    npm install; \
    else \
    npm install --only=production;\
    fi
COPY ./ ./
RUN npx prisma generate
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}
EXPOSE $PORT
CMD [ "node","src/index.js" ]