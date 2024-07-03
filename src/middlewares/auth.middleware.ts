import { MiddlewareNext, Request, Response } from 'hyper-express';
import cookie from 'cookie';
import signature from 'cookie-signature';
import { config, redis } from '..';

export async function authenticate(
  req: Request,
  res: Response,
  next: MiddlewareNext
) {
  const reqCookie = req.headers.cookie;
  if (!reqCookie) {
    res.status(401).send('Unauthorized');
    return;
  }
  const decodedCookie = cookie.parse(reqCookie, {
    decode: (value) => signature.unsign(value, config.session.secret) || value,
  });

  const sid = decodedCookie[config.session.name];
  if (!sid) {
    res.status(401).send('Unauthorized');
    return;
  }
  const uuid  = await redis.get(sid);
  if (!uuid) {
    res.status(401).send('Unauthorized');
    return;
  }

  req.params.uuid = uuid;
  next();
}
