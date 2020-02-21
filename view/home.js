const template = require('./template');
const header = template.header();

const TEMP_LOW = 18.0;
const TEMP_HIGH = 26.0;
const HUMID_LOW = 20.0;
const HUMID_HIGH = 28.0;
const CDS_LOW = 100.0;
const CDS_HIGH = 300.0;
const DIST_LOW = 10.0;
const DIST_HIGH = 30.0

const ok = `bg-success`;
const up = `bg-danger`;
const down = `bg-secondary`;

module.exports.home = function(navBar, menuLink, sensor, actuator) {
    let temp = sensor.temperature;
    let humid = sensor.humidity;
    let cds = sensor.cds;
    let dist = sensor.distance;
    let sTime = sensor.sTime;
    let sUid = sensor.uid;
    let red = actuator.redLED;
    let green = actuator.greenLED;
    let blue = actuator.blueLED;
    let relay = actuator.relay;
    let aTime = actuator.aTime;
    let reason = actuator.reason;
    let aUid = actuator.uid;

    let tempSign, humidSign, cdsSign, distSign;
    if (temp > TEMP_HIGH)
        tempSign = up;
    else if (temp < TEMP_LOW) 
        tempSign = down;
    else tempSign = ok;

    if (humid > HUMID_HIGH) 
        humidSign = up;
    else if (humid < HUMID_LOW) 
        humidSign = down;
    else humidSign = ok;

    if (cds > CDS_HIGH) cdsSign = up;
    else if (cds < CDS_LOW) cdsSign = down;
    else cdsSign = ok;

    if (dist > DIST_HIGH) distSign = up;
    else if (dist < DIST_LOW) distSign = down;
    else distSign = ok;

    return `
<!DOCTYPE html>
<html lang="ko">
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
                <div class="col-12"><h3>스마트팜 상태</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h4>센서</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th>항목</th><th>범위</th>
                            <th style="text-align: center;">값</th>
                            <th>측정자</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><i class="fas fa-thermometer-half"></i>&nbsp;&nbsp;온도</td>
                            <td>0 ~ 40℃</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${tempSign}" role="progressbar" style="width: ${temp/40*100}%" aria-valuemin="0" aria-valuemax="40">${temp}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-tint"></i>&nbsp;&nbsp;습도</td>
                            <td>0 ~ 60%</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${humidSign}" role="progressbar" style="width: ${humid/60*100}%" aria-valuemin="0" aria-valuemax="60">${humid}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td><i class="far fa-lightbulb"></i>&nbsp;&nbsp;조도</td>
                            <td>0 ~ 500</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${cdsSign}" role="progressbar" style="width: ${cds/100*100}%" aria-valuemin="0" aria-valuemax="100">${cds}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-ruler-vertical"></i>&nbsp;&nbsp;거리</td>
                            <td>0 ~ 50cm</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${distSign}" role="progressbar" style="width: ${dist/50*100}%" aria-valuemin="0" aria-valuemax="100">${dist}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p style="text-align: right;">최종 측정시각: ${sTime}</p>
                </div>
                <div class="col-1"></div><br>
                <div class="col-11">
                    <h4>액츄에이터</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th scope="col">항목</th><th>범위</th>
                            <th scope="col" style="text-align: center;">값</th>
                            <th scope="col">조작자</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>적색 LED</td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${red/255*100}%" aria-valuemin="0" aria-valuemax="255">${red}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>녹색 LED</td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: ${green/255*100}%" aria-valuemin="0" aria-valuemax="255">${green}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>청색 LED</td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${blue/255*100}%" aria-valuemin="0" aria-valuemax="255">${blue}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>릴레이</td><td>0 ~ 1</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-secondary" role="progressbar" style="width: ${relay*100}%" aria-valuemin="0" aria-valuemax="1">${relay}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td colspan="2">조작 사유: ${reason}</td>
                            <td colspan="2" style="text-align: right;">최종 조작시각: ${aTime}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div><br>
                </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}