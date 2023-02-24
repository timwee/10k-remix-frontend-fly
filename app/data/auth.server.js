import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = "secret"; //process.env.SESSION_SECRET;
const PASSWORD = "pw"; // process.env.PASSWORD;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(redirectPath) {
  console.log("in createUserSession");
  const session = await sessionStorage.getSession();
  session.set("loggedIn", true);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getIsLoggedIn(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const loggedIn = session.get("loggedIn");

  if (!loggedIn) {
    return false;
  }

  return loggedIn;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const isLoggedIn = await getIsLoggedIn(request);

  if (!isLoggedIn) {
    throw redirect("/auth");
  }

  return isLoggedIn;
}

export async function login({ password }) {
  const passwordCorrect = password === PASSWORD;

  if (!passwordCorrect) {
    const message =
      "Could not log you in, please check the provided credentials.";
    const error = new Error(message);
    error.status = 401;
    error.message = message;
    throw error;
  }

  return createUserSession("/");
}
