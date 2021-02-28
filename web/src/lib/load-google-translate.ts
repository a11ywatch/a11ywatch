export function loadGoogleTranslate() {
  try {
    if (window?.google) {
      const layoutType = window?.innerWidth >= 800 ? 'SIMPLE' : 'vk'

      if (window?.google?.translate?.TranslateElement) {
        const mainElement = new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout:
              window.google.translate.TranslateElement.InlineLayout[layoutType],
          },
          'google_translate_element'
        )
        if (mainElement?.ca) {
          const glang = document.getElementById('google_translate_element')

          if (glang) {
            glang.replaceWith(mainElement.ca)
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
