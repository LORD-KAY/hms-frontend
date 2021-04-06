
# HMS Frontend Application
> An simple hospital management application frontend application.
> This application contains the ui connected to the rest api services which can be found here [https://github.com/LORD-KAY/hms-api](hms-api-service)
### Clone the repository
```bash
git clone [https://github.com/LORD-KAY/hms-api.git ](https://github.com/LORD-KAY/hms-api.git)
```

Navigate to the root directory i.e the hms-api-service
```bash
cd hms-api/
```

### Spin up the app api service container
Build the image
```bash
docker build -t hms-service .
```
Start the frontend from the Dockerfile
```bash
docker run -it -d --name hms-service -p 8090:8090 hms-service
```
Access the rest api from your browser or postman on http://localhost:8090/api/v1
