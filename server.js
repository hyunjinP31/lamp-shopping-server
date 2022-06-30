const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// json 형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
//브라우저 cors이슈를 막기 위해 사용(모든 브라우저의 요청을 일정하게 받겠다.)
app.use(cors());

//요청처리
// app.메서드(url, 함수)
//req -> 요청
//res -> 응답


app.get('/products',async(req, res)=>{
    const result = {
        products: [
            {
                id: 1,
                name: '거실조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 2,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 3,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 4,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 5,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 6,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 7,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
            {
                id: 8,
                name: '아동조명',
                price: 50000,
                imgsrc:"images/products/product1.jpg",
                seller: "green",
            },
        ]
    }
    res.send(result);
})
app.post('/green',async(req,res)=>{
    console.log(req);
    res.send('그린 게시판에 게시글이 등록되었습니다.')
});

//실행
app.listen(port, ()=>{
    console.log('쇼핑몰 서버 가동중');
})