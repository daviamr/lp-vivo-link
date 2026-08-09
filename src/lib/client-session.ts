import type { ClientFingerprint } from "@/types/order"

const CLIENT_IP_KEY = "vivo-client-ip"

function parseBrowser(userAgent: string) {
  if (userAgent.includes("Chrome/")) {
    const version = userAgent.match(/Chrome\/([\d.]+)/)?.[1] ?? ""
    return { name: "Chrome", version }
  }

  if (userAgent.includes("Firefox/")) {
    const version = userAgent.match(/Firefox\/([\d.]+)/)?.[1] ?? ""
    return { name: "Firefox", version }
  }

  if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) {
    const version = userAgent.match(/Version\/([\d.]+)/)?.[1] ?? ""
    return { name: "Safari", version }
  }

  return { name: "Unknown", version: "" }
}

export function collectFingerprint(): ClientFingerprint {
  return {
    os: { name: navigator.platform, version: "" },
    device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
    browser: parseBrowser(navigator.userAgent),
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    resolution: {
      dpr: window.devicePixelRatio,
      width: window.screen.width,
      height: window.screen.height,
    },
    timezone_offset: new Date().getTimezoneOffset(),
  }
}

export function getClientIp() {
  return localStorage.getItem(CLIENT_IP_KEY) ?? ""
}

export async function initClientSession() {
  if (localStorage.getItem(CLIENT_IP_KEY)) {
    return
  }

  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = (await response.json()) as { ip?: string }
    if (data.ip) {
      localStorage.setItem(CLIENT_IP_KEY, data.ip)
    }
  } catch {
    localStorage.setItem(CLIENT_IP_KEY, "")
  }
}

export function getCurrentUrl() {
  return window.location.href
}
