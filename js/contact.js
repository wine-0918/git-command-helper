// EmailJS初期化とお問い合わせフォーム機能
console.log('contact.js読み込み開始');

// EmailJS初期化
emailjs.init("JrulMP-Mi8egamGmO");
console.log('EmailJS初期化完了');

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded発火');
    
    // フォーム送信処理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('フォーム要素見つかりました');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('フォーム送信イベント発火');

            // 送信ボタンを無効化
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';

            // フォームデータを取得
            const templateParams = {
                user_name: this.user_name.value,
                user_email: this.user_email.value,
                message: this.message.value
            };

            console.log('送信データ:', templateParams);

            // お問い合わせメール送信
            emailjs.send('service_5psbqcp', 'template_5459usq', templateParams)
                .then(function(response) {
                    console.log('お問い合わせメール送信成功:', response);
                    
                    // 自動返信メール送信
                    return emailjs.send('service_5psbqcp', 'template_4wiqzmg', {
                        to_email: templateParams.user_email,
                        to_name: templateParams.user_name,
                        user_message: templateParams.message,
                        reply_to: 'yuto.imata.wine@gmail.com',
                        submit_time: new Date().toLocaleString('ja-JP')
                    });
                })
                .then(function(response) {
                    console.log('自動返信メール送信成功:', response);
                    
                    // 成功時の処理
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> 送信完了';
                    submitBtn.style.backgroundColor = '#28a745';

                    // 通知を表示
                    showNotification('お問い合わせを送信しました！確認メールもお送りしました。');

                    // フォームをリセット
                    contactForm.reset();

                    // 3秒後にボタンを元に戻す
                    setTimeout(function() {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                })
                .catch(function(error) {
                    console.error('送信エラー:', error);
                    
                    // エラー時の処理
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 再送信';
                    submitBtn.style.backgroundColor = '#dc3545';

                    // エラー通知を表示
                    showNotification('お問い合わせの送信に失敗しました。しばらく経ってから再度お試しください。', 'error');

                    // 3秒後にボタンを元に戻す
                    setTimeout(function() {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                });
        });
    } else {
        console.error('contactFormが見つかりません');
    }
});

// 通知表示関数
function showNotification(message, type = 'success') {
    console.log('通知表示:', message, type);
    
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    if (!notification || !notificationText) {
        console.warn('通知要素が見つかりません、アラート表示');
        alert(message);
        return;
    }

    notificationText.textContent = message;

    if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
        const icon = notification.querySelector('i');
        if (icon) icon.className = 'fas fa-exclamation-circle';
    } else {
        notification.style.backgroundColor = '#28a745';
        const icon = notification.querySelector('i');
        if (icon) icon.className = 'fas fa-check-circle';
    }

    notification.classList.add('show');

    setTimeout(function() {
        notification.classList.remove('show');
    }, 5000);
}

// グローバルに公開
window.showNotification = showNotification;

console.log('contact.js読み込み完了');
