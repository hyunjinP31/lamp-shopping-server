const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const models = require('./models');


// json 형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
//브라우저 cors이슈를 막기 위해 사용(모든 브라우저의 요청을 일정하게 받겠다.)
app.use(cors());

//요청처리
// app.메서드(url, 함수)
//req -> 요청
//res -> 응답


app.get('/products',async(req, res)=>{
    //데이터 베이스 조회하기
    models.Product.findAll()
    .then(result=>{
        console.log();
        res.send(result);
    })
    .catch(e=>{
        console.error(e)
        res.send('파일 조회에 문제가 있습니다.')
    })
})
//method get이고 url은 /product/2 와 같이 요청이 온 경우
app.get('/product/:id', async (req, res)=>{
    const params = req.params;
    const { id } = params;
    //하나만 조회 - findOne -> select문
    models.Product.findOne({
        //조건절(객체 안에 다시 객체 형태로 넣어줌)
        where:{
            id: id,
        }
    })
    .then(result=>{
        res.send(result);
    })
    .catch(e=>{
        console.log(e);
        res.send('상품조회에 문제가 생겼어요')
    })
});
app.post('/green',async(req,res)=>{
    console.log(req);
    res.send('그린 게시판에 게시글이 등록되었습니다.')
});

//실행
app.listen(port, ()=>{
    console.log('쇼핑몰 서버 가동중');
    //sequelize와 DB연결
    //DB 동기화
    models.sequelize
    .sync() //연결
    .then(()=>{
        console.log('연결성공')
    }) //성공
    .catch(e=>{
        console.error(e);
        console.log('DB연결 에러');
        //서버실행이 안 되면 프로세서를 종료
        process.exit;
    }) //실패
})