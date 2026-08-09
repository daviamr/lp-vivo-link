import { createContext, useContext } from "react"

type TalkToUsContextValue = {
  openTalkToUs: () => void
}

export const TalkToUsContext = createContext<TalkToUsContextValue>({
  openTalkToUs: () => {},
})

export function useTalkToUs() {
  return useContext(TalkToUsContext)
}
