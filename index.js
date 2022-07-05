const express = require('express');
const cors = require('cors');
const app = express();
//헤로쿠에서 포트 지정하는 게 있으면 그 번호를 사용 없으면 8080포트를 사용
const port = process.env.PORT || 8080;
const models = require('./models');
//npm init;
//module 설치하면 파일과 폴더가 하나씩 생김..
// 업로드 이미지를 관리하는 스토리지 서버를 연결 -> 멀터를 사용하겠다.
const multer = require('multer');
//이미지 파일이 요청오면 어디에 저장할 건지 지정
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cd){
            //어디에 저장할 거냐? /upload
            cd(null, 'upload/')
        },
        filename: function(req, file, cd){
            //어떤 이름으로 저장할거냐?
            //file 객체의 오리지널 이름으로 저장
            cd(null, file.originalname)
        }
    })
});
//multer 라이브러리에서 자세히 알 수 있음

// json 형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
//브라우저 cors이슈를 막기 위해 사용(모든 브라우저의 요청을 일정하게 받겠다.)
app.use(cors());

//요청처리
// app.메서드(url, 함수)
//req -> 요청
//res -> 응답

//upload 폴더에 있는 파일에 접근할 수 있도록 설정
app.use("/upload", express.static("upload"));

//이미지 파일을 post로 요청이 왔을 때 upload라는 폴더에 이미지를 저장하기
//이미지가 하나일 때 single
app.post('/image', upload.single('image'),(req,res)=>{
    const file = req.file;
    console.log(file);
    res.send({
        imageUrl: "http://localhost:3000/"+ file.destination+file.filename,
    })
})


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
app.post('/products', (req)=>{
    //http: body에 있는 데이터
    const body = req.body;
    //body 객체에 있는 값을 각각 변수에 할당
    const { name, price, seller, imageUrl,description } = body;
    if(!name || !price || !seller){
        res.send("모든 필드를 입력해주세요");
    }
    //Product 테이블에 레코드를 삽입
    models.Product.create({
        name :name,
        price: price,
        seller,
        imageUrl,
        description,
    }).then(result=>{
        console.log("상품 생성 결과 : ",result)
    })
    .catch(e=>{
        console.log(e);
    })
})
//삭제하기
app.delete('/product/:id', async (req)=>{
    const params = req.params;
    models.Product.destroy({ where: { id: params.id }})
    .then(result => console.log(result));
})

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

//npx nodemon server.js 로 돌리기