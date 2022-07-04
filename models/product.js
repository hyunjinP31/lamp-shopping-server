//Common.js 구문 내보니기
//module.exports
//테이블을 모델링하는 파일
module.exports = (sequelize, DataTypes)=>{
    //컬럼 name, price, imgurl, seller
    //제약조건 alllowNull : 컬럼의 값이 없어도 되는 여부(default: true)
    const product = sequelize.define('Product',{
        name: {
            type: DataTypes.STRING(20),
            allowNall: false,
        },
        price: {
            type: DataTypes.INTEGER(20),
            allowNall: false,
        },
        imageUrl: {
            type: DataTypes.STRING(500),
        },
        seller: {
            type: DataTypes.STRING(200),
            allowNall: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNall: false,
        },
    })
    return product;
}