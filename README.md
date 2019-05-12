# Moonshot-HA

### Scalable microservice that handles form submissions

## Summary

> This repository contains source code of a microservice written in TypeScript and running
> in Node.js environment. It uses Inversify.js for dependency inversion. Redis for storing
> allowed hosts, and rate limited IP addresses. MongoDB for storing unstructured form data
> submissions. Development is done using Docker and Docker Compose.

## Installation

Install dependencies:

```bash
yarn install
```

## Running the application locally

> Before running the application, make sure you have ".env" file in root directory (same
> directory as package.json file). This file has to include environment variables that are
> necessary for API to work. You can use ".env.example" file as your boilerplate.

```bash
docker-compose -f "docker-compose.yml" up -d --build

# App is running at http://localhost:3000
```

## Running the tests

```bash
yarn test
```

## Usage (using HTTPie)

### Adding new form submission

> If you will try to add new customer with existing phone number, for some reason Bringg
> API will return 401 error. This is unexpected behaviour, and it is not handled by the
> application.

```bash
http POST http://localhost:3000 name="John"
```

### Getting the tasks by hostname

```bash
http GET http://localhost:3000/ domain=="localhost"
```
