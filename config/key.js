//환경에 따라 설정됨 - local에 있을경우(development) / 배포한후(production)

//배포한후(production)
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else{
    //local에 있을경우(development)
    module.exports = require('./dev');
}