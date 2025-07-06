// EmailJS初期化とお問い合わせフォーム機能
(function () {
    // EmailJS初期化
    emailjs.init({
        publicKey: "JrulMP-Mi8egamGmO"
    });

    // DOM読み込み完了後に実行
    document.addEventListener('DOMContentLoaded', function() {
        // フォーム送信処理
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    });

    // フォーム送信処理
    function handleFormSubmit(e) {
        e.preventDefault();

        // 送信ボタンを無効化
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';

        // フォームデータを取得
        const formData = {
            user_name: this.user_name.value,
            user_email: this.user_email.value,
            message: this.message.value
        };

        // お問い合わせメール送信
        console.log('お問い合わせメール送信開始');
        emailjs.sendForm('service_5psbqcp', 'template_5459usq', this)
            .then(() => {
                console.log('お問い合わせメール送信成功');
                
                // 自動返信メール送信
                console.log('自動返信メール送信開始:', {
                    to_email: formData.user_email,
                    to_name: formData.user_name,
                    user_message: formData.message,
                    reply_to: 'yuto.imata.wine@gmail.com',
                    submit_time: new Date().toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                });
                
                return emailjs.send('service_5psbqcp', 'template_4wiqzmg', {
                    to_email: formData.user_email,
                    to_name: formData.user_name,
                    user_message: formData.message,
                    reply_to: 'yuto.imata.wine@gmail.com',
                    submit_time: new Date().toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                });
            })
            .then(() => {
                console.log('自動返信メール送信成功');
                
                // 成功時の処理
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 送信完了';
                submitBtn.style.backgroundColor = '#28a745';

                // 通知を表示
                showNotification('お問い合わせを送信しました！確認メールもお送りしました。');

                // フォームをリセット
                this.reset();

                // 3秒後にボタンを元に戻す
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            })
            .catch((error) => {
                // エラー時の処理
                console.error('送信エラー:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 再送信';
                submitBtn.style.backgroundColor = '#dc3545';

                // エラー詳細を表示
                let errorMessage = 'お問い合わせの送信に失敗しました。';
                if (error.text) {
                    console.error('エラー詳細:', error.text);
                }
                if (error.status) {
                    console.error('ステータス:', error.status);
                    errorMessage += ` (ステータス: ${error.status})`;
                }
                
                // エラー通知を表示
                showNotification(errorMessage, 'error');

                // 3秒後にボタンを元に戻す
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            });
    }

    // 通知表示関数
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');

        if (!notification || !notificationText) {
            console.warn('通知要素が見つかりません');
            return;
        }

        notificationText.textContent = message;

        if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
            notification.querySelector('i').className = 'fas fa-exclamation-circle';
        } else {
            notification.style.backgroundColor = '#28a745';
            notification.querySelector('i').className = 'fas fa-check-circle';
        }

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // グローバルに公開（他のスクリプトから使用可能にする）
    window.showNotification = showNotification;
})();
