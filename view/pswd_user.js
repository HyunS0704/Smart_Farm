const template = require('./template');
const header = template.header();

module.exports.pswd_user = function(navBar, menuLink, user) {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        ${header}
    </head>
    <body>
        <div class="container">
            ${navBar}
            <br>
            <div class="row" style="margin-top: 30px">
                <div class="col-2">
                    ${menuLink}
                </div>
                <div class="col-10">
                <div class="row" style="margin-left: 10px">
                    <div class="col-12"<h3>비밀번호 변경</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-7">
                        <form action="/user/password" method="POST">
                        <input type="hidden" name="uid" value="${user.uid}">
                            <table class="table table-borderless">
                                <tr>
                                    <td>아이디</td>
                                    <td>${user.uid}</td>
                                </tr>
                                <tr>
                                    <td>현재 패스워드</td>
                                    <td><input type="password" class="form-control" name="oldPswd"></td>
                                </tr>
                                <tr>
                                    <td>이름</td>
                                    <td><input type="text" class="form-control" id="name"  name="name" value="${user.name}"></td>
                                </tr>
                                <tr>
                                    <td>신규 비밀번호</td>
                                    <td><input type="password" class="form-control" id="pswd"  name="pswd"></td>
                                </tr>
                                <tr>
                                    <td>신규 패스워드 확인</td>
                                    <td><input type="password" class="form-control" id="pswd2"  name="pswd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <button type="submit" class="btn btn-primary">변경</button>&nbsp;&nbsp;
                                        <button type="reset"" class="btn btn-secondary">취소</button>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}