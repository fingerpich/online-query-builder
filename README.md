# online-query-builder
Its a simple, powerful, customizable query builder enables you to quickly build complex queries without any programming knowledge on-the-go.
ts written to generate Solr database but you could change it for another database.

## how to build a custom online query builder
 
 - Clone this project
 - Remove .git folder and run `git init` to make it your own
 - Run development environment by `npm run start`
 - Change service.js to provide needed data
 - if you use another database you should change `generateQuery` function in `searchBuilder.vue`
