## Local environment deployment:
```
npm install
```
1. create .env file under the cubejs-deployment folder
2. paste in the .env file the following:
```CUBEJS_DB_HOST=localhost
CUBEJS_DB_NAME=bidding
CUBEJS_DB_USER=root
CUBEJS_DB_PASS=
CUBEJS_DB_TYPE=mysql
CUBEJS_API_SECRET=a085d56f3ebee22b42cd22bb62b8bf92f25992ae13888176cf9273f7b91c9d10e17ffcbf9692a2982071dd8d1f64b8a5fe2ceac656e99448faa8ff827e78cdf8
#NODE_ENV=production
#REDIS_URL=redis://localhost:6379/0
#REDIS_URL=redis://arbitrary_usrname:Yq34jabZr5@redis:6379/0
```

```
npm run dev
```

## using docker:

```bash
docker build -t registry.gitlab.com/cubejs-deployment .
```


```bash
 docker run --name cubejs-deployment -p 4000:4000 -d registry.gitlab.com/cubejs-deployment
```

```bash
docker run --name cubejs-deployment --rm -p 4000:4000 \
-e CUBEJS_DB_HOST=localhost \
-e CUBEJS_DB_NAME=bidding \
-e CUBEJS_DB_USER=root \
-e CUBEJS_DB_TYPE=mysql \
-e CUBEJS_API_SECRET=a085d56f3ebee22b42cd22bb62b8bf92f25992ae13888176cf9273f7b91c9d10e17ffcbf9692a2982071dd8d1f64b8a5fe2ceac656e99448faa8ff827e78cdf8 \
registry.gitlab.com/cubejs-deployment
```
