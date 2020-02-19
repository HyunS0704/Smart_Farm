const express = require('express');
const dbModule = require('./db-module');
const alert = require('./view/alertMsg');
const template = require('./view/template');
const wm = require('./weather-module');

const router = express.Router();

router.get('/list', function(req, res) {            //로그인만 하면 누구나 접근권한이 가능하다.
    if(req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요', '/');
        res.send(html);
    }
    else {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            dbModule.getAllUsers(function(rows){
                let view = require('./view/list_user');
                let html =view.list_user(navBar, menuLink, rows);
                //console.log(rows);
                res.send(html);
            });
        });
    }
});
router.get('/register', function(req, res) {        //admin(관리자)으로 로그인 해야 접근권한이 가능
    if(req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요', '/');
        res.send(html);
    }else if (req.session.userId != 'admin') {
        let html = alert.alertMsg('등록할 권한이 없습니다.', '/user/list');
        res.send(html);
    }
    else {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            dbModule.getAllDepts(function(rows) {
                let view = require('./view/register_user');
                let html =view.register_user(navBar, menuLink, rows);
                //console.log(rows);
                res.send(html);
            });
        });
    }
});
router.post('/register', function(req, res) {
    let uid = req.body.uid;
    let pswd = req.body.pswd;
    let pswd2 = req.body.pswd2;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    //console.log(uid, pswd, pswd2, deptId, tel);
    dbModule.getUserInfo(uid, function(row) {
        //console.log(row);
        if(row === undefined) {
            if(pswd === pswd2) {
                dbModule.register_user(uid, pswd, name, deptId, tel, function() {
                    res.redirect('/user/list');
                });
            }else{
                let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/user/register');
                res.send(html);
            }
        }else {
            let html = alert.alertMsg(`${uid}아이디가 중복입니다.`, '/user/register');
            res.send(html);
        }
    });
});
router.get('/update/uid/:uid', function(req, res) {         //본인 아이디만 수정이 가능함
    let uid = req.params.uid;
    if(req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요', '/');
        res.send(html);
    }
    else  if(req.session.userId != uid) {
        let html = alert.alertMsg('본인 것만 수정할 수 있습니다', '/user/list');
        res.send(html);
    }
    else{
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            dbModule.getAllDepts(function(rows){
                dbModule.getUserInfo(uid, function(row) {
                    let view = require('./view/update_user');
                    let html = view.update_user(navBar, menuLink, rows, row)      //detp, user
                    res.send(html);
                });
            });
        });
    }
});
router.post('/update', function(req, res) {
    let uid = req.body.uid;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    dbModule.update_user(uid, name, deptId, tel, function() {
        res.redirect('/user/list');
    });
});

router.get('/password/uid/:uid', function(req, res) {
    let uid = req.params.uid;
    if(req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요', '/');
        res.send(html);
    }else if (req.session.userId != 'admin') {
        let html = alert.alertMsg('패스워드를 변경할 수 없습니다.', '/user/list');
        res.send(html);
    }
    else{
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
                dbModule.getUserInfo(uid, function(user) {
                    let view = require('./view/pswd_user');
                    let html = view.pswd_user(navBar, menuLink, user)      //detp, user
                    res.send(html);
                });
        });
    }
});

router.post('/password', function(req, res) {
    let uid = req.body.uid;
    let oldPswd = req.body.oldPswd;
    let pswd = req.body.pswd;
    let pswd2 = req.body.pswd2;
    let name = req.body.name;

    dbModule.getUserInfo(uid, function(user) {
        if (oldPswd !== user.password) {    // 현재 패스워드가 틀렸을 때
            let html = alert.alertMsg(`현재 패스워드가 틀립니다.`, `/user/password/uid/${uid}`);
            res.send(html);
        }
        else if(pswd !== pswd2) {
            let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/user/password/uid/admin');
            res.send(html);
        }
        else{                  
            dbModule.pswd_user(uid, pswd, function() {
                let html = alert.alertMsg('패스워드가 변경 되었습니다', '/user/logout');
                res.send(html);
            });
        }
    });
});

router.get('/delete/uid/:uid', function(req, res) {         //관리자로 로그인해야 삭제할 수 있음
    if(req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요', '/');
        res.send(html);
    }else if (req.session.userId != 'admin') {
        let html = alert.alertMsg('사용자를 삭제할 수 없습니다.', '/user/list');
        res.send(html);
    }
    else {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            let uid = req.params.uid;
            let view = require('./view/delete_user');
            let html = view.delete_user(navBar, menuLink, uid);
            res.send(html);
        });
    }
});
router.post('/delete', function(req, res) {
    let uid = req.body.uid;
    dbModule.delete_user(uid, function() {
        res.redirect('/user/list');
    });
});

router.post('/login', function(req, res)
{
    let uid = req.body.uid;
    let pswd = req.body.pswd;
    console.log(uid, pswd);
    dbModule.getUserInfo(uid, function(user) {
        if(user === undefined) {
            let html = alert.alertMsg('아이디가 없습니다.', '/');
            res.send(html);
        }
        else if(pswd !== user.password) {
            let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/');
            res.send(html);
        }
        else{                   //로그인 성공
            console.log(`${uid} login 성공`);
            req.session.userId = uid;
            req.session.userName = user.name;
            let html = alert.alertMsg(`${user.name}님 환영합니다.`, '/home');
            res.send(html);
        }
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports =router;