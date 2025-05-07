document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", () => {
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        if (!username || !password) {
            alert("請輸入帳號與密碼！");
            return;
        }

        // 顯示帳密（純前端模擬用）
        console.log("輸入的帳號:", username);
        console.log("輸入的密碼:", password);

        // 模擬假登入成功
        alert("登入成功！（模擬）\n帳號：" + username + "\n密碼：" + password);

        // 如果你想傳送到伺服器，這邊可以用 fetch，例如：
        // fetch('https://your-server.com/save', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username, password })
        // }).then(res => res.json())
        //   .then(data => console.log("伺服器回應：", data))
        //   .catch(err => console.error("錯誤：", err));
    });
});

