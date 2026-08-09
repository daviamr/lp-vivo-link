const IGNORED_PATH_SEGMENTS = new Set([
  "pf",
  "pj",
  "pf#",
  "pj#",
  "contratacao",
  "sucesso",
  "editar",
  "editar-concluido",
  "retomar",
  "politica-de-privacidade",
  "termos-de-uso",
])

export function getPartnerHashFromUrl() {
  const segment = window.location.pathname.replace(/^\//, "").split("/")[0]

  if (!segment || IGNORED_PATH_SEGMENTS.has(segment)) {
    return null
  }

  return segment
}
