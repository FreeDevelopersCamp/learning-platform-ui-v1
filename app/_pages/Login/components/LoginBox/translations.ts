export const zodValidationTranslationsEn = {
  loginBoxEmailFieldValidation: "Invalid email",
  loginBoxPasswordFieldValidation: "Password should have at least 2 letters",
};

export const loginBoxComponentTranslationsEn = {
  loginBoxTitle: "Welcome back to",

  loginBoxEmailFieldLabel: "Email address",
  loginBoxEmailFieldPlaceholder: "hello@gmail.com",

  loginBoxPasswordFieldLabel: "Password",
  loginBoxPasswordFieldPlaceholder: "Your password",

  loginBoxCheckboxLabel: "Keep me logged in",

  loginBoxLoginButtonTitle: "Login",

  ...zodValidationTranslationsEn,

  yourSessionExpired: "Your session has expired.",
};

export default {
  en: loginBoxComponentTranslationsEn,
};
