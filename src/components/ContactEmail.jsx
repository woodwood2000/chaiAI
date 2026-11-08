import { useState } from 'react'
import { siteConfig } from '../data/siteConfig'

/**
 * ContactEmail — 邮箱入口：点击调用本机邮件客户端，右侧按钮一键复制地址。
 * 纯静态站唯一安全可用的「配置邮箱」方式：不涉及任何 SMTP/IMAP 凭据。
 */
export default function ContactEmail({ className = '', tone = 'light' }) {
  const [copied, setCopied] = useState(false)
  const email = siteConfig.email

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        const ta = document.createElement('textarea')
        ta.value = email
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('复制邮箱地址', email)
    }
  }

  const linkTone =
    tone === 'dark'
      ? 'text-cyan-300 hover:text-cyan-200'
      : 'text-[#0071e3] hover:text-[#0058b0]'
  const btnTone =
    tone === 'dark'
      ? 'border-white/15 text-white/60 hover:text-white hover:border-white/30'
      : 'border-black/10 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/25'

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={`mailto:${email}`}
        className={`underline-offset-4 hover:underline transition-colors ${linkTone}`}
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? '已复制邮箱地址' : '复制邮箱地址'}
        className={`px-2 py-0.5 rounded-md border text-[11px] transition-colors ${btnTone}`}
      >
        {copied ? '已复制' : '复制'}
      </button>
    </span>
  )
}
