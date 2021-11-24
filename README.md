# plataforma-cursos

A course platform developed using laravel, angular and docker.

## Run Locally

Clone the project

```bash
https://github.com/ThalesZago/plataforma-cursos.git
```

Go to the docker directory

```bash
cd plataforma-cursos
cd code_docker
```

Run docker

```bash
docker-compose up -d
```

After that, go to the backend directory

```bash
cd src
composer install
php artisan migrate
php artisan serve
```

Now you need to up the frontend

Go back to the frontend folder

```bash
cd plataforma-cursos-frontend
npm install
ng serve
```
