
```bash
docker build -t registry.gitlab.com/superads-sdk-reports-api .
```


```bash
 docker run --name superads-sdk-reports-api -p 4000:4000 -d registry.gitlab.com/superads-sdk-reports-api
```

```bash
docker run --name superads-sdk-reports-api --rm -p 4000:4000 \
-e CUBEJS_DB_HOST=localhost \
-e CUBEJS_DB_NAME=super_ads \
-e CUBEJS_DB_USER=root \
-e CUBEJS_DB_TYPE=mysql \
-e CUBEJS_API_SECRET=a085d56f3ebee22b42cd22bb62b8bf92f25992ae13888176cf9273f7b91c9d10e17ffcbf9692a2982071dd8d1f64b8a5fe2ceac656e99448faa8ff827e78cdf8 \
registry.gitlab.com/superads-sdk-reports-api
```