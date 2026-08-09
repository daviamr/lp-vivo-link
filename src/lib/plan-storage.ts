import { touchFlowTimestamp } from "@/lib/storage-expiry"
import type { Plan } from "@/types/plan"

const PLAN_STORAGE_KEY = "vivo-selected-plan"

export function savePlan(plan: Plan) {
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan))
  touchFlowTimestamp()
}

export function getPlan(): Plan | null {
  const raw = localStorage.getItem(PLAN_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Plan
  } catch {
    return null
  }
}

export function clearPlan() {
  localStorage.removeItem(PLAN_STORAGE_KEY)
}
