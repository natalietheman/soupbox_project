import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import { languageOptions } from '../languages'
import { LanguageContext } from '../containers/language'

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext)
  // Loop through properties of one object
  // object -> array of objects with value+label properties
  const langOptions = []
  for (var language in languageOptions) {
    const lang = { value: language, label: languageOptions[language] }
    langOptions.push(lang)
  }

  // set selected language by calling context method
  const handleLanguageChange = selectedOption => {
    userLanguageChange(selectedOption.value)
  }

  // update default language and rerender when selected language changes
  useEffect(() => {
    let defaultLanguage = window.localStorage.getItem('lang')
    if (!defaultLanguage) {
      defaultLanguage = window.navigator.language.substring(0, 3)
    }
    userLanguageChange(defaultLanguage)
  }, [userLanguageChange])

  return (
    <Select
      onChange={handleLanguageChange}
      defaultValue={userLanguage}
      options={langOptions}
      autoFocus
    />
  )
}
