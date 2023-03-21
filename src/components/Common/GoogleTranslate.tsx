import styled from "@emotion/styled"
import React, { FunctionComponent, useEffect } from "react"

const GoogleTranslator = styled.div`
  margin-left: auto;
  width: 100%;
`

const GoogleTranslate: FunctionComponent = function () {
  const googleTranslateElementInit = () => {
    new google.translate.TranslateElement(
      {
        pageLanguage: "ko",
        includedLanguages: "en,ja",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element",
    )
  }

  useEffect(() => {
    const addScript = document.createElement("script")
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
    )
    document.body.appendChild(addScript)
    window.googleTranslateElementInit = googleTranslateElementInit
  }, [])

  return (
    <>
      <GoogleTranslator id="google_translate_element" />
    </>
  )
}
export default GoogleTranslate
