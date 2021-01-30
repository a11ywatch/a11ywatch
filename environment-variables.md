# Environment Variables

- [Use `.env` to load environment variables](#loading-environment-variables)

## Loading Environment Variables

A11yWatch has support for loading environment variables from `.env` files. Each sub-directory has a indivual .env file to manage.

An example `.env`:

```bash
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

You can setup the .env file by running the `chmod +x ./bootstrap.sh && ./bootstrap.sh` script in the root of the project

> **Note**: we only use one type of .env which is the main .env file for detection. Partains 12factor rules `.gitignore`.
