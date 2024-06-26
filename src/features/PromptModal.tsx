import React, { useState, type FormEvent } from "react"
import { FaArrowDown } from "react-icons/fa6"
import { LuRefreshCcw } from "react-icons/lu"

export default function PromptModal({
  setOpen,
  open
}: {
  setOpen: (state: boolean) => void
  open: boolean
}) {
  const [prompt, setPrompt] = useState<string>("")
  const [chat, setChat] = useState<
    Array<{ message: string; type: "ai" | "you" }>
  >([])

  const handlePromptSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (prompt !== "") {
      setChat((chat) => [...chat, { message: prompt, type: "you" }])
      setChat((chat) => [
        ...chat,
        {
          message:
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
          type: "ai"
        }
      ])
      setPrompt("")
    } else {
      alert("type something in prompt")
    }
  }

  const handleInsertResponse = () => {
    const linkedinMsgField = document.querySelector(
      "div.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate.msg-form__contenteditable--redesign > p"
    )
    const lastMessage = chat[chat.length - 1].message
    if (linkedinMsgField instanceof HTMLElement) {
      linkedinMsgField.focus()
      linkedinMsgField.innerText = lastMessage
      linkedinMsgField.dispatchEvent(new Event("input", { bubbles: true }))
    }
    setOpen(false)
  }
  return (
    <>
      <div
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transitionDuration: "0.2s"
        }}
        className="__modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition scale-75"
        onClick={() => setOpen(false)}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-auto my-6 mx-auto">
          <div className="rounded-[0.8rem] max-w-[750px] w-screen shadow-lg relative flex flex-col bg-[#F9FAFB] outline-none focus:outline-none ">
            <div className="relative p-6 flex-auto text-4xl flex flex-col gap-5">
              {chat.length > 0 && (
                <div className="__chat w-full p-5 gap-5">
                  {chat.map((msg) => {
                    return (
                      <div
                        className={`__chat_item mt-3 ${msg.type === "you" ? "bg-[#DFE1E7] text-[#666D80] w-2/3 p-3 rounded-xl ml-auto text-right" : "bg-[#DBEAFE] text-[#666D80] w-2/3 p-3 rounded-xl text-left"}`}>
                        {msg.message}
                      </div>
                    )
                  })}
                </div>
              )}
              <form onSubmit={handlePromptSubmit}>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter Prompt"
                  className="p-3 px-6 rounded-[1rem] outline-none w-full border border-gray-300 bg-white"
                />
                <div className="__btn_container w-full flex justify-end items-center py-5 gap-5">
                  {chat.length > 0 ? (
                    <>
                      <button
                        type="button"
                        onClick={handleInsertResponse}
                        className="p-3 bg-transparent border-2 border-[#666D80] px-[2rem] rounded-[0.7rem] transition text-[#666D80] flex justify-center items-center gap-3">
                        <FaArrowDown />
                        Insert
                      </button>
                      <button
                        type="submit"
                        className="p-3 bg-[#3B82F6] border-2 border-[#3B82F6] px-[2rem] rounded-[0.7rem] transition hover:bg-blue-600 text-white flex justify-center items-center gap-3">
                        <LuRefreshCcw />
                        Regenerate
                      </button>
                    </>
                  ) : (
                    <button className="p-3 bg-[#3B82F6] px-[2rem] rounded-[0.7rem] transition hover:bg-blue-600 text-white">
                      Generate
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          opacity: open ? 0.25 : 0,
          pointerEvents: open ? "all" : "none",
          transitionDuration: "0.2s"
        }}
        className="fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
