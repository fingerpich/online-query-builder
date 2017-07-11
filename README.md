# Online Query Builder
Its a simple, powerful, customizable query builder enables you to quickly build complex queries without any programming knowledge on-the-go.
ts written to generate Solr database but you could change it for another database.

## how to build a custom online query builder
 
 - Clone this repository.
 - Remove .git folder and run `git init` to make it your own.
 - Run development environment by `npm run start`
 - Change `services/service.js` to provide needed data
 - If you use a database other than solr, you have to change function in `services/database.js`
