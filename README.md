# いまとも(仮)

チーム：ブルー３による 「○○したい」仲間を集めるアプリ。

* 大川リーダ
* 藤岡
* 青屋

# メンバーへ

ＥＭＡＴは教育ではない、仕事の一環である。　
「頑張ったけどダメだった」は通用しない。　各自、奮闘するように。　
どーしてもダメだとジャッジしたときは早めにアラームあげること！！！

タスク管理表
http://fujioka-tomonobu.github.io/tasklist/

# 開発環境構築のすすめ

* mkdir imatomo & cd imatomo  
* git clone https://github.com/okawahiroto/imatomo.git  
* npm install
* bower install

# 実行してみよう

* grunt serve

# Firebase項目定義


プロファイル　項目定義（ここはソーシャル認証に持っていくかな...）
* $id         ：ID
* usernane    ：利用者名


公言　項目定義
* $id         ：ID
* userid      ：登録した人のユーザID
* title       ：○○したい！
* time        ：いつ
* place       ：どこで
* comment     ：コメント
* group       ：発信先グループID
* craetetimestamp ：登録日時
* lastApprovalUserid  ：最後に賛同した人のユーザID
* approvals   ：賛同した人一覧（予定）
     userid

グループ　項目定義
* $id         ：ID
* groupname   ：グループ名
* members     ：参加メンバー
     userid