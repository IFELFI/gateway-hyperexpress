export interface ISession {
  uuid: string;
}

declare module 'hyper-express' {
  interface Request {
    session: ISession;
  }
}