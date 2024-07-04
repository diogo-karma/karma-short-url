# karma-short-url

This is a URL shortener project using Redis as the database. It allows creating short URLs and redirecting to the original long URLs. The project is developed in Node.js and uses pnpm as the package manager, but it can also be used with npm or yarn.

## Requirements

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/)

## Configuration

### Environment Variables

You need to configure the following environment variables in the `.env` file:

- `PORT`: Port where the web application will run.
- `SALT`: Salt for data encryption.
- `REDIS_KEY`: Key for records in Redis.

Example of the `.env` file:

```env
PORT=3000
SALT=your_salt_here
REDIS_KEY=your_redis_key_here
```

### Development

```ssh
pnpm dev
```


### To start the application in production, it is recommended to use PM2:

```ssh 
pnpm install pm2 -g
pm2 start index.js --name "karma-short-url"
```

### Adaptation
This URL shortener can be easily adapted to any project based on the REDIS_KEY.

### Contribution
Feel free to contribute to this project. Fork the repository, create a branch for your feature or bug fix, and send a pull request.

### yay

Developed by Diogo "Karma" Tzion <dg@karma.yt> from Karma.YT.
If you need any further changes or additions, let me know!

License
This project is licensed under the MIT License. See the LICENSE file for more information.

