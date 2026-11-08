/**
 * asset() — 给站内绝对资源路径补上 Vite base 前缀。
 *
 * 站点原本部署在自定义域名根目录（base='/')，所有资源都写成 /images/... 这类绝对路径。
 * Fork 部署到 GitHub Pages 项目页时站点位于 /chaiAI/ 子路径下，必须补前缀。
 *
 * 幂等：已经是 base 前缀、或本身是外链（https://、//cdn、相对路径）时原样返回，
 * 因此可以安全地包裹来自 JSON 数据的路径，也不会重复加前缀。
 */
const BASE = import.meta.env.BASE_URL || '/'
const ROOT = BASE.replace(/\/$/, '')

export default function asset(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) return path
  if (!ROOT) return path
  if (path === ROOT || path.startsWith(`${ROOT}/`)) return path
  return `${ROOT}${path}`
}
