type AppModel = {
  pwaInstalled: boolean
}

const appModel: AppModel = {
  pwaInstalled: false,
}

const installed = 'appinstalled'

function setPwaInstalled(event?: Event) {
  appModel.pwaInstalled = true

  if (event) {
    window.removeEventListener(installed, setPwaInstalled)
  }
}

function initAppModel() {
  if (typeof window !== 'undefined') {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstalled()
    } else if (!appModel.pwaInstalled) {
      window.addEventListener(installed, setPwaInstalled)
    }
  }
}

export { appModel, initAppModel }
