import React, { useCallback, useEffect, useRef, useState } from "react"
import { PiMagicWandFill } from "react-icons/pi"

import PromptModal from "./PromptModal"

export default function AiButton() {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 100
  })
  const [open, setOpen] = useState<boolean>(false)

  const [renderBtn, setRenderBtn] = useState<boolean>(false)
  const observerRef = useRef<MutationObserver | null>(null)
  const inputRef = useRef<HTMLElement | null>(null)

  const handleInputFocus = useCallback(() => {
    setRenderBtn(true)
  }, [])

  const handleBlurFocus = useCallback(() => {
    setTimeout(() => {
      setRenderBtn(false)
    }, 200)
  }, [])

  const handleMutationObserver = () => {
    const messageInput = document.querySelector(".msg-form__contenteditable")
    if (messageInput) {
      const rect = messageInput.getBoundingClientRect()
      const inputBoxRight = rect.right
      const inputBoxBottom = rect.bottom
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      const modifyButtonX = Math.min(inputBoxRight - 30, windowWidth - 100)
      const modifyButtonY = Math.min(inputBoxBottom - 30, windowHeight - 50)

      setPosition({ x: modifyButtonX, y: modifyButtonY })

      if (inputRef.current !== messageInput) {
        if (inputRef.current) {
          inputRef.current.removeEventListener("focus", handleInputFocus)
          inputRef.current.removeEventListener("blue", handleBlurFocus)
        }
        if (messageInput instanceof HTMLElement) {
          messageInput.addEventListener("focus", handleInputFocus)
          messageInput.addEventListener("blur", handleBlurFocus)
          inputRef.current = messageInput
        }
      }
    } else {
      console.log("Message Input Not Found")
    }
  }

  useEffect(() => {
    const observer = new MutationObserver(handleMutationObserver)
    observer.observe(document.body, { childList: true, subtree: true })
    observerRef.current = observer
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          top: position.y,
          left: position.x,
          opacity: renderBtn ? 1 : 0,
          pointerEvents: renderBtn ? "all" : "none"
        }}
        className="fixed z-50 w-10 h-10 rounded-full bg-white text-[#2563EB] flex justify-center items-center shadow-md cursor-pointer transition hover:scale-110">
        <PiMagicWandFill size={14} />
      </div>
      <PromptModal open={open} setOpen={setOpen} />
    </>
  )
}
