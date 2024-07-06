# karma-short-url

This is a URL shortener project using Redis as the database. It allows creating short URLs and redirecting to the original long URLs. The project is developed in Node.js and uses pnpm as the package manager, but it can also be used with npm or yarn.

## Requirements

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/)

## Configuration

### Environment Variables

The following environment variables can be configured in the `.env` file. If not specified, the application will connect to Redis locally without a user and password.

- `PORT`: Port where the web application will run.
- `SALT`: Salt for data encryption (to be implemented).
- `REDIS_KEY`: Key for records in Redis.
- `REDIS_HOST`: Address of the Redis server (optional, default: `localhost`).
- `REDIS_PORT`: Port of the Redis server (optional, default: `6379`).
- `REDIS_USER`: Redis user (optional).
- `REDIS_PASSWORD`: Redis password (optional).

Example of the `.env` file:

```env
PORT=3000
SALT=your_salt_here
REDIS_KEY=your_redis_key_here
REDIS_HOST=your_redis_host_here
REDIS_PORT=your_redis_port_here
REDIS_USER=your_redis_user_here
REDIS_PASSWORD=your_redis_password_here
```

## REST APIs

There are two types of REST APIs available:

1. **/:id**
   - Endpoint: `/:id`
   - Parameter: `id` (unique)
   - Description: Returns the short URL information in JSON format.
   
   Example usage:
   ```
   GET /P0sm7FQ
   ```
   Response:
   ```json
   {
     "id": "P0sm7FQ",
     "url": "https://karma.yt",
     "key": "pollinations",
     "date": "2024-07-06T03:37:48.076Z"
   }
   ```

2. **/:key/:id**
   - Endpoint: `/:key/:id`
   - Parameters: `key` (specific key), `id` (unique)
   - Description: Searches Redis based on the specified key, replacing the default key from the `.env` file for specific behavior. Also returns the information in JSON format.
   
   Example usage:
   ```
   GET /kpax/P0sm7FQ
   ```
   Response:
   ```json
   {
     "id": "P0sm7FQ",
     "url": "https://karma.yt",
     "date": "2024-07-06T03:37:48.076Z",
     "key": "kpax"
   }
   ```

## Creating URLs

To create a short URL, use the `url` query string with the GET method.

Example usage:
```
GET /new?url=https%3A%2F%2Fexample.com
```
Response:
```json
{
  "status": "ok",
  "id": "ZQOYgjU"
}
```

Example with key: 
```
GET /new?url=https%3A%2F%2Fexample.com&key=kpax
```
Response:
```json
{
  "status": "ok",
  "id": "ZQOYgjU",
  "key": "kpax"
}
```

## Development

```ssh
pnpm dev
```

## To start the application in production, it is recommended to use PM2:

```ssh 
pnpm install pm2 -g
pm2 start index.js --name "karma-short-url"
```

## Adaptation

This URL shortener can be easily adapted to any project based on the `REDIS_KEY`.

## Contribution

Feel free to contribute to this project. Fork the repository, create a branch for your feature or bug fix, and send a pull request.

## TODO

- Implement data encryption using `SALT`.

## yay

Developed by Diogo "Karma" Tzion <dg@karma.yt> from [KARMA.YT](https://karma.yt/?ref=karma-short-url.git).
If you need any further changes or additions, let me know!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE), file for more information.
