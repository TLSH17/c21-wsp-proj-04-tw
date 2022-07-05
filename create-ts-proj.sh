npm init -y

npm install \
    express \
    typecript \
    ts-node \
    dotenv \
    pg \
    express-session \
    @types/node \
    @types/express \
    @types/express-session \
    @types/pg \


npm install -D \
    ts-node-dev

npm set-script dev "ts-node-dev server.ts"

npm set-script start "node index.js"

echo '
.DS_Store
node_modules
package-lock.json
.env
' > .gitignore


echo '{
    "compilerOptions": {
      "module": "commonjs",
      "target": "es5",
      "lib": ["es6", "dom"],
      "sourceMap": true,
      "allowJs": true,
      "jsx": "react",
      "esModuleInterop": true,
      "moduleResolution": "node",
      "noImplicitReturns": true,
      "noImplicitThis": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "suppressImplicitAnyIndexErrors": true,
      "noUnusedLocals": true
    },
    "exclude": ["node_modules", "build", "scripts", "index.js"]
  }' > tsocnfig.json

echo '
require("ts-node/register")
require("./server")

' > index.js

echo '
SESSION_SECRET=
DB_NAME=
DB_USERNANEM=
DB_PASSSWORD=
'


