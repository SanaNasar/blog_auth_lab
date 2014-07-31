# Auth Blog
## Review Authentication

### Getting Started

Assuming we've gone through something like  the `helpful_notes.md` we can focus on adding authentication for `users`. However, we should do the following:

* npm install
  * do a quick `sqlize -V` check
* `createdb auth_blg_development`
* `sqlize db:migrate`
* take a look at the `user` and `post` models
  * add `classMethods` for the `user`
    * `encryptPass`
    * `comparePass`
    * `createNewUser`
    * `authorize`
