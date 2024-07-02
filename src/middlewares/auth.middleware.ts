import { MiddlewareNext, Request, Response } from "hyper-express";
import cookie from 'cookie';

export function authenticate(req: Request, res: Response, next: MiddlewareNext) {
  const reqCookie = req.headers.cookie;
  if (!reqCookie) {
    res.status(401).send('Unauthorized');
    return;
  }
  const parsedCookie = cookie.parse(reqCookie); 
  const session = parsedCookie['SID'];
  console.log('reqCookie', reqCookie);
  
  console.log(parsedCookie, session);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }
  req.session = {
    uuid: session
  };
  next();
}