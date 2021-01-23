import React, { useState, createContext, useContext } from 'react'
import { languageOptions, dictionaryList } from '../languages'

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'eng',
  dictionary: dictionaryList.eng,
})

// allows access to the language context to any component wrapped inside provider tags
export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState('eng')

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'eng'
      setUserLanguage(newLanguage)
      window.localStorage.setItem('lang', newLanguage)
    },
  }

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  )
}

// get text according to id & current language (from json dictionary)
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext)
  return languageContext.dictionary[tid] || tid
}
