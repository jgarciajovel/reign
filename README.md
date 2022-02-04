## Description

Small API for Reign Junior Back End Developer Challenge.
This API allows you to get the latest news from [Algolia API](https://hn.algolia.com/api/v1/search_by_date?query=nodejs)

### Tasks
- The server, once an hour, should connect to the API ✅
- It should insert the data from the API ✅
- Define a REST API which the client will be used to retrieve the data. ✅
- Return paginated results with a maximum of 5 items. ✅
- Should be able to be filtered by author, _tags, title. ✅
- Endpoint that allows the user to remove items. ✅

### Stack
- Nest.JS
- Database: MongoDB - [Hosted](https://cloud.mongodb.com/).
- ORM: Mongoose

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Postman
Use the file called **Reign.postman_collection.json** in order to import the Collections to Postman and test the API.
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Juan Carlos García](jc.garciajovel@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
