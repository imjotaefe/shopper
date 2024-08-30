This is a test for SHOPPER 
## Installation

```bash
$ yarn install
```

## Running the app

```bash
docker compose up
```

## Test

```bash
# unit tests
$ yarn run test
```
### The env should be like that

```bash
GEMINI_API_KEY=
DATABASE_URL='postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public'
POSTGRES_USER="docker"
POSTGRES_PASSWORD="docker"
POSTGRES_DB="shopper"
```
