import { SanitizedUser } from '~/user/user.types'

export function generateRegisteredUserMailContent(
  user: SanitizedUser,
  name: string,
  data: Record<string, string | number>,
): string {
  let content = `<p>Hey ${user.name}\nYou have received a response on ${name}</p>\n`
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      content += `<p>${key} : ${value}</p>\n`
    }
  })

  return content
}

export const mailBridgeSignature = `<div style="display: flex; align-items:center; justify-content: center;>
  <a href="http://localhost:5173">Mail Bridge</a>
</div>`
