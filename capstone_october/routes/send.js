const express = require('express');
const router = express.Router();
const conn = require("../connection");
const accountSid = 'AC647044fa57bd4e4c9b2b0f8864f08fb9';
const authToken = 'c04e39fd0adbb05aa32f5636b06fdba5';
const client = require('twilio')(accountSid, authToken);

router.post('/', function (req, res, next) {//투표 결과 처리

    var sentence = 'select * from users where authorization_code = ?'; 
    console.log('0-00000여기는 실행되곧있니?')

    conn.query(sentence,[req.body.vote_auth_code], function(err,result){
        console.log('11111여기는 실행되곧있니?')

        if(err) console.log("에러의 유형은"+ err);
        for(let i =0; i<result.length; i++){
            console.log('22222여기는 실행되곧있니?')
            client.messages.create({
                to: result[i].p_number,
                from:'+12057079411',
                body:'곧 선거가 개설될 예정입니다 투표에 참여해주시기 바랍니다'
                },function(err, message){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(message.sid);
                    }
                })
            }
                req.session.save(function(){
            res.redirect('/list');
        })    
    })
})


module.exports = router;