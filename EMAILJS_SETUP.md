# EmailJS設定ガイド

Git Command Helperのお問い合わせフォームを実際に動作させるために、EmailJSの設定が必要です。

## 1. EmailJSアカウントの作成

1. https://www.emailjs.com/ にアクセス
2. "Sign Up"でアカウントを作成
3. メールアドレスとパスワードを設定

## 2. Email Serviceの追加

1. ダッシュボードの"Email Services"から"Add New Service"をクリック
2. Gmail、Outlook、Yahoo Mailなどから選択
3. 認証を完了させる
4. Service IDをメモしておく（例: service_gmail）

## 3. Email Templatesの作成

### お問い合わせ受信用テンプレート
1. "Email Templates"から"Create New Template"をクリック
2. 以下のテンプレートを設定：

**件名:** 
```
新しいお問い合わせ - {{user_name}}様より
```

**本文:**
```
新しいお問い合わせが届きました。

■ 送信者情報
名前: {{user_name}}
メールアドレス: {{user_email}}
送信日時: {{submit_time}}

■ お問い合わせ内容
{{message}}

---
Git Command Helper お問い合わせシステム
```

3. Template IDをメモしておく（例: template_contact_123）

### 自動返信用テンプレート
1. 新しいテンプレートを作成
2. 以下の設定：

**件名:**
```
お問い合わせありがとうございます - Git Command Helper
```

**本文:**
```
{{to_name}} 様

この度は Git Command Helper にお問い合わせいただき、ありがとうございます。
以下の内容でお問い合わせを受け付けました。

■ 受付日時: {{submit_time}}
■ お問い合わせ内容:
{{user_message}}

内容を確認の上、通常1-2営業日以内にご返信いたします。
お急ぎの場合は、直接メールにてご連絡ください。

---
Git Command Helper サポートチーム
{{reply_to}}
```

3. Template IDをメモしておく（例: template_autoreply_456）

## 4. Public Keyの取得

1. ダッシュボードの"Account"セクションから"API Keys"を選択
2. "Public Key"をコピー

## 実際の設定値（現在の設定）

あなたのEmailJSアカウントから確認できた値：

- **Service ID**: `service_5psbqcp`
- **開発者受信用テンプレートID**: `template_5459usq`
- **自動返信用テンプレートID**: `template_4wiqzmg`
- **Public Key**: `JrulMP-Mi8egamGmO`

## contact.jsの現在の設定

```javascript
// Public Key
emailjs.init({
    publicKey: "JrulMP-Mi8egamGmO"
});

// お問い合わせメール送信（開発者が受け取る）
emailjs.sendForm('service_5psbqcp', 'template_5459usq', this)

// 自動返信メール送信（お問い合わせ者に送信）
emailjs.send('service_5psbqcp', 'template_4wiqzmg', {
```

この設定で以下のようになります：
1. フォーム送信 → 開発者（あなた）にお問い合わせ内容が届く
2. 同時に → お問い合わせ者に自動返信メールが届く

## 5. contact.jsファイルの修正

`js/contact.js`ファイルの以下の値を変更してください：

```javascript
// 1. Public Key
emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY" // ← ここに取得したPublic Key
});

// 2. Service ID（2箇所）
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', this)

emailjs.send('YOUR_SERVICE_ID', 'YOUR_AUTOREPLY_TEMPLATE_ID', {

// 3. Template ID（2種類）
// お問い合わせ受信用
'YOUR_CONTACT_TEMPLATE_ID'

// 自動返信用
'YOUR_AUTOREPLY_TEMPLATE_ID'

// 4. メールアドレス（2箇所）
reply_to: 'YOUR_EMAIL@example.com'
```

## 6. テスト

1. ブラウザでcontact.htmlを開く
2. フォームに情報を入力して送信
3. 以下を確認：
   - 管理者（あなた）にお問い合わせメールが届く
   - 送信者に自動返信メールが届く

## トラブルシューティング

### エラーが発生する場合
1. ブラウザの開発者ツール（F12）でコンソールを確認
2. EmailJSのダッシュボードで送信履歴を確認
3. Service IDとTemplate IDが正しいか確認

### メールが届かない場合
1. スパムフォルダを確認
2. EmailJSのダッシュボードで送信ステータスを確認
3. Email Serviceの認証が正しく完了しているか確認

## 無料プランの制限

EmailJSの無料プランでは：
- 月200通まで送信可能
- EmailJSのロゴが入る

必要に応じて有料プランにアップグレードしてください。
