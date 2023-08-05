document.body.addEventListener("click", function(e) {
	// e.target was the clicked element
	if(e.target && (e.target.nodeName == "A" || e.target.nodeName == "BUTTON")) {
		const eventName = "CLICK_BUTTON";
        const value = e.target.id;
        updateSession();
        trackEvent(eventName, value);
	}
});

const maxSecondsSession = 30 * 60; // seconds

getMachineId();

document.body.addEventListener('mousemove', updateSession);
document.body.addEventListener('scroll', updateSession);
document.body.addEventListener('keydown', updateSession);
document.body.addEventListener('touchstart', updateSession);

const possibleValues = {
    "utm_source": ["whatsapp", "instagram", "linkedin", "twitter", "tiktok", "email", "cv", "work_application"],
    "utm_medium": ["social", "referal", "work_application"]
};



async function getMachineId() {

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
        "utm_source": urlParams.get("utm_source"),
        "utm_medium": urlParams.get("utm_medium"),
        "utm_content": urlParams.get("utm_content")
    }
    
    let deviceId = localStorage.getItem('PPW_DeviceID');
    
    if (!deviceId) {
        registerDevice();
    }

    let sessionId = localStorage.getItem('PPW_SessionID');

    if (!sessionId) {
        registerSession(utmParams);
        const eventName = "START_NEW_SESSION";
        const value = null;
        trackEvent(eventName, value);
    } else{
        let currTimestamp = getCurrentTimestamp();
        sessionId = JSON.parse(sessionId);

        if (diffTwoTimestamp(sessionId["lastActivity"], currTimestamp) > maxSecondsSession){
            registerSession(utmParams);
            const eventName = "START_NEW_SESSION";
            const value = "time-out";
            trackEvent(eventName, value);
        } else{
            let utm = localStorage.getItem('PPW_UTM');
            if (utm == JSON.stringify(utmParams)){
                const eventName = "REFRESH_PAGE";
                const value = null;
                updateSession();
                trackEvent(eventName, value);
            } else{
                registerSession(utmParams);
                const eventName = "START_NEW_SESSION";
                const value = "change-utm";
                trackEvent(eventName, value);
            }
        }
    }

    return deviceId;
}

function registerDevice(){
    let deviceId = getID();

    let device = {
        "deviceID": deviceId,
        "createdTime": getCurrentTimestamp(),
    };

    localStorage.setItem('PPW_DeviceID', JSON.stringify(device));
}

async function registerSession(utmParams) {
    let sessionId = getID();
    let visitTimestamp = getCurrentTimestamp();
    let session = {
        "sessionID": sessionId,
        "lastActivity": visitTimestamp
    };
    localStorage.setItem('PPW_SessionID', JSON.stringify(session));
    registerUTM(utmParams);
    const ip = await getIP();
    let deviceInfo = getDeviceInformation();
    deviceInfo = {...deviceInfo, ...ip, ...utmParams};
    deviceInfo["sessionID"] = sessionId;
    deviceInfo["visitTimestamp"] = visitTimestamp;

    trackVisit(deviceInfo);
}

function updateSession() {
    let session = JSON.parse(localStorage.getItem("PPW_SessionID"));
    session["lastActivity"] = getCurrentTimestamp();
    localStorage.setItem('PPW_SessionID', JSON.stringify(session));
}

function registerUTM(utmParams){
    localStorage.setItem('PPW_UTM', JSON.stringify(utmParams));
}

function getID() {
    return crypto.randomUUID();
}

function getDeviceInformation(){
    return {
        "deviceID": JSON.parse(localStorage.getItem('PPW_DeviceID'))["deviceID"],
        "deviceType": getDeviceType(),
        "os": getOS(),
        "screenSize": getScreenSize(),
    };
}

function getIP() {
    return new Promise(function (resolve, reject) {
        var url = "https://www.geoplugin.net/json.gp";
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() { 
            // request successful
            // we can use server response to our request now
            let response = JSON.parse(request.responseText);
            let ret = {
                "ipAddress": response["geoplugin_request"],
                "latitude": Number(response["geoplugin_latitude"]),
                "longitude": Number(response["geoplugin_longitude"]),
                "city": response["geoplugin_city"],
                "region": response["geoplugin_regionName"],
                "country": response["geoplugin_countryName"],
                "continent": response["geoplugin_continentName"]
            }
            
            resolve(ret);
        };

        request.onerror = function() {
            let response = JSON.parse(request.responseText);
            reject(response);
        };

        request.send(null);
    });
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}

function getScreenSize() {
    var screenSize = '';
    if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }
    return screenSize
}

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "Tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "Mobile";
    }
    return "Desktop";
}

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = "Unknown";
  
    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }
  
    return os;
}

function diffTwoTimestamp(isostring1, isostring2){
    var d1 = new Date(isostring1), d2 = new Date(isostring2);

    return (d2-d1)/1e3; // seconds
}

function trackEvent(eventName, value){
    let timestamp = getCurrentTimestamp();
    let deviceID = JSON.parse(localStorage.getItem("PPW_DeviceID"))["deviceID"];
    let sessionID = JSON.parse(localStorage.getItem("PPW_SessionID"))["sessionID"];
    let ret = {
        "timestamp": timestamp,
        "deviceID": deviceID,
        "sessionID": sessionID,
        "eventName": eventName,
        "value": value
    };
    
    var url = "https://script.google.com/macros/s/AKfycbz_23XKcWZUd7Mi-rj3qQzxwPnTvm_7khaUxbirqWWFv32-umpItValXw7GAmaWj5cV9w/exec";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { 
        // request successful
        // we can use server response to our request now
        console.log(request.responseText);
    };

    request.onerror = function() {
        console.log(request.responseText);
    };

    var form_data = new FormData();

    for ( var key in ret ) {
        form_data.append(key, ret[key]);
    }

    request.send(form_data);
}

function trackVisit(data) {
    var url = "https://script.google.com/macros/s/AKfycby0XAzhuj-IuMECZZ0O3ubN7NI-byytRd5BXFWX8ZHkxsGV5L1t-AAIQ6JzfCtpTtzA/exec";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { 
        // request successful
        // we can use server response to our request now
        console.log(request.responseText);
    };

    request.onerror = function() {
        console.log(request.responseText);
    };

    var form_data = new FormData();

    for ( var key in data ) {
        form_data.append(key, data[key]);
    }

    request.send(form_data);
}