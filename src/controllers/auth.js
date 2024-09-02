import { THIRTY_DAY } from '../constants/index.js';
import {
  createUser,
  logUser,
  outUser,
  refreshSession,
} from '../services/auth.js';

const registerUser = async (req, res, next) => {
  const user = await createUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const loginUser = async (req, res, next) => {
  const session = await logUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + THIRTY_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

const logoutUser = async (req, res, next) => {
  await outUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const refreshSessionUser = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshSession({ sessionId, refreshToken });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + THIRTY_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};
export { registerUser, loginUser, logoutUser, refreshSessionUser };
