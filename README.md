
# HMS Frontend Application
> An simple hospital management application frontend application.
> This application contains the ui connected to the rest api services which can be found here [hms-api-service](https://github.com/LORD-KAY/hms-api)

### Clone the repository
```bash
git clone https://github.com/LORD-KAY/hms-frontend.git
```

Navigate to the root directory i.e the hms-frontend
```bash
cd hms-frontend/
```
### Running it locally
```bash
    yarn install  or npm install
   yarn run serve or npm run serve
```

# OR
### Spin up the app frontend container
Build the image
```bash
docker build -t hms-frontend .
```
Start the frontend from the Dockerfile
```bash
docker run -it -d -p 8081:8080 --name hms-frontend hms-frontend
```
Access the app from your browser on http://localhost:8081

### Testing Credentials
## Admin
```bash
username: testing@gmail.com
password: password
```
Then you can create an account for a patient


