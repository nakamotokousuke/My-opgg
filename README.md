```bash
$ git clone https://github.com/nakamotokousuke/My-opgg.git
```

```bash
$ npm i
```

- [Riot Developer](https://developer.riotgames.com)
- .env.local

```bash
API_KEY = RiotAPI
NEXT_PUBLIC_LATEST = 12.23.1
```

firebase のセットアップ

- [Firebase](https://firebase.google.com)
  google にサインイン
  プロジェクトを追加
  アプリを追加からウェブを選択
  firebase.js にペースト
  firestore の設定

```bash
  import { getFirestore } from "firebase/firestore";
  export const db = getFirestore(app);
```

- error
- .eslintrc.json

```bash
{
  "extends": ["next", "prettier","next/core-web-vitals"],
  "plugins": ["prettier"]
}
```

```bash
$ npm run dev
```
