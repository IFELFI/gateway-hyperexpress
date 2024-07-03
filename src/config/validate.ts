import { Static, Type } from "@sinclair/typebox"
import { Value } from '@sinclair/typebox/value';

const T = Type.Object({
  port: Type.Number(),
  session: Type.Object({
    name: Type.String(),
    secret: Type.String()
  }),
  redis: Type.Object({
    url: Type.String()
  })
})

type T = Static<typeof T>

export const validate = (raw: Record<string, unknown>) => {
  const config: T = {
    port: parseInt(raw.PORT as string),
    session: {
      name: raw.SESSION_NAME as string,
      secret: raw.SESSION_SECRET as string
    },
    redis: {
      url: raw.REDIS_URL as string
    }
  }
  const result = [...Value.Errors(T, config)]
  if (result.length > 0) {
    throw new Error(`Invalid config: ${result.map((e) => `${e.path} ${e.message}`).join(', ')}`)
  }
  return config
}