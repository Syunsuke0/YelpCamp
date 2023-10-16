const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: "String",
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose, {
  errorMessages: { UserExistsError: "そのユーザー名はすでに使われています。" },
  MissingPasswordError: "パスワードを入力してください。",
  MissingUsernameError: "ユーザー名を入力してください。",
  AttemptTooSoonError:
    "ログインの失敗が続いたため、アカウントをロックしました。",
  TooManyAttemptsError:
    "アカウントがロックされています。しばらく時間をおいてから再度お試しください。",
  NoSaltValueStoredError: "認証できませんでした。",
  IncorrectPasswordError: "パスワードまたはユーザー名が間違っています。",
  IncorrectUsernameError: "パスワードまたはユーザー名が間違っています。",
});

module.exports = mongoose.model("User", userSchema);
