const template = require('./template');
const header = template.header();

module.exports.update_user = function(navBar, menuLink, depts, user) {
    let option = '';
    for(dept of depts) 
    {
        if(user.deptId === dept.did) 
        {
            option += `<option value="${dept.did}" selected>${dept.name}</option>`;
        }
        else
        {
            option += `<option value="${dept.did}">${dept.name}</option>`;
        }
    }
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
                    <div class="col-12"<h3>사용자 수정</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-7">
                        <form action="/user/update" method="POST">
                        <input type="hidden" name="uid" value="${user.uid}">
                            <table class="table table-borderless">
                                <tr>
                                    <td>아이디</td>
                                    <td>${user.uid}</td>
                                </tr>
                                <tr>
                                    <td>이름</td>
                                    <td><input type="text" class="form-control" id="name"  name="name" value="${user.name}"></td>
                                </tr>
                                <tr>
                                    <td>부서명</td>
                                    <td>
                                        <select class="form-control" id="dept" name="dept">
                                            ${option}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td><input type="text" class="form-control" id="tel"  name="tel" value="${user.tel}"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <button type="submit" class="btn btn-primary">수정</button>&nbsp;&nbsp;
                                        <button type="reset"" class="btn btn-secondary" onclick="location.href= '/user/list'">취소</button>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div calss="col-3"></div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}
