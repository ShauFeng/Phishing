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

        const accountData = `帳號: ${username}\n密碼: ${password}\n`;

        const blob = new Blob([accountData], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'account.txt';
        link.click();
    });
});
