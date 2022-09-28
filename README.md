## Description
This repo exists to be used as a template for new projects using nest-js. It comes with:
- Prometheus Metrics (and interceptor for response time)
- Postgres integration with typeORM
- Redis integration (not cache)
- Basic Lint
- Tests structure (and sqlite as test-util) 
- .gitlab-cy.yml with build and test pipeline
- Log level configuration
- Basic configuration file for env vars
- Swagger
- Docker compose (for local development)

## Dependencies
- Docker
- Node (16.16.0+)
- NPM (8.11.0+)

## Install
```bash
$ npm install
$ npm run deps
```
### Optional
Create `.env` file in root and populate with variables found under src/config/configuration.ts

## Start
```bash
# Dev
$ npm run start:dev

# Prod
$ npm run start:prod
```

## Test
```bash
# Testes unitários
$ npm run test

# Testes end-to-end
$ npm run test:e2e

# testes com cobertura
$ npm run test:cov
```
