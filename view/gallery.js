const template = require('./template');
const header = template.header();

module.exports.gallery = function(navBar, menuLink,) {
    return `
<!DOCTYPE html>
<html lang="ko">
<html>
<head>
	${header}
</head>
<body>
<div class="container">
    ${navBar}
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>센서 조회</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                <div id="demo" class="carousel slide" data-ride="carousel">

                <!-- Indicators -->
                <ul class="carousel-indicators">
                  <li data-target="#demo" data-slide-to="0" class="active"></li>
                  <li data-target="#demo" data-slide-to="1"></li>
                  <li data-target="#demo" data-slide-to="2"></li>
                  <li data-target="#demo" data-slide-to="3"></li>
                  <li data-target="#demo" data-slide-to="4"></li>
                  <li data-target="#demo" data-slide-to="5"></li>
                  <li data-target="#demo" data-slide-to="6"></li>
                  <li data-target="#demo" data-slide-to="7"></li>
                  <li data-target="#demo" data-slide-to="8"></li>
                  <li data-target="#demo" data-slide-to="9"></li>
                  <li data-target="#demo" data-slide-to="10"></li>
                  <li data-target="#demo" data-slide-to="11"></li>
                  <li data-target="#demo" data-slide-to="12"></li>
                  <li data-target="#demo" data-slide-to="13"></li>
                </ul>
                
                <!-- The slideshow -->
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="index.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="login.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="home.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="sensor.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="raspardu.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="b_home.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="actuator.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="relayon.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="list.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="register.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="b_list.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="update.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="password.png" width="850" height="400">
                  </div>
                  <div class="carousel-item">
                    <img src="delete.png" width="850" height="400">
                  </div>
                </div>
                
                <!-- Left and right controls -->
                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#demo" data-slide="next">
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}