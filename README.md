# create-svelte

Firebase rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shoutbox/{document} {
      allow read: if true;
      allow create: if
      	get(/databases/$(database)/documents/users/$(request.auth.uid)).data.login == request.resource.data.username
   			&& request.resource.data.timestamp == request.time
   			&& request.resource.data.message is string
        ;
    }
    match /users/{document} {
      allow read: if request.auth.uid == document;
    }
  }
}
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
