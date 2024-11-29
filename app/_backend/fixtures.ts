import { User } from "@/types/user";

const temporarlyExpirationTimeSeconds = 60;
const temporarlyExpirationTimeMinutes = 60;
const temporarlyExpirationTimeHours = 12;
const temporarlyExpirationTimeMiliseconds = 1000;
const temporarlyExpirationTime =
  temporarlyExpirationTimeHours *
  temporarlyExpirationTimeSeconds *
  temporarlyExpirationTimeMinutes *
  temporarlyExpirationTimeMiliseconds;

const avatars = {
  user1:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
};

export const someUserData: User = {
  id: "999",
  fullName: "Ahmad Ahmad",
  expirationTime: new Date().getTime() + temporarlyExpirationTime,
  photoURL: avatars.user1,
  firstName: "Ahmad",
  lastName: "Ahmad",
};
