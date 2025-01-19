<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームデータの取得とサニタイズ
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // メールの宛先
    $to = "your_email@gmail.com"; // ここにGmailアドレスを入力

    // メールの件名
    $subject = "お問い合わせフォームからのメッセージ";

    // メールの本文
    $body = "名前: $name\n";
    $body .= "メールアドレス: $email\n\n";
    $body .= "メッセージ:\n$message\n";

    // ヘッダー情報
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // メール送信
    if (mail($to, $subject, $body, $headers)) {
        // 送信成功時のリダイレクト
        header("Location: thank_you.html");
        exit();
    } else {
        // 送信失敗時のリダイレクト
        header("Location: error.html");
        exit();
    }
} else {
    // POST以外のリクエストを拒否
    header("Location: index.html");
    exit();
}
?>
