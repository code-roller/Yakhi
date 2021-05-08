// @ts-check

export class BrowserTab {
    /**
     * @constructor
     * @param {string} url The url to open 
     * @param {boolean} currentTab whether to open ina new tab or not
     */
    constructor(url, currentTab=false, trigger=true){
        this.url = url
        this.currentTab = currentTab

        if(trigger){
            this.openResourceLocator(this.url.trim())
        }
    }

    /**
     * @public
     * 
     * Open the url in a new tab or current tab
     * based on this.currentTab parameter passed
     * in with the contructor
     * 
     * @param {string} url 
     * @returns {null | void}
     */
    openResourceLocator = (url) => {
        if(this.currentTab){
            window.location.href = url
            return null
        }
        window.open(url)
    }
}