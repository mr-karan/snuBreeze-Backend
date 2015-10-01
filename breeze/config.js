var connection_string = "";
  if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;

}
console.log(connection_string);

module.exports = {
  TOKEN_SECRET: 'breezeBack',
  //MONGO_URI: 'mongodb://karan:breeze@ds047732.mongolab.com:47732/breeze'
	MONGO_URI: connection_string
};
