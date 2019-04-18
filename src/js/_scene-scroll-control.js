/*

new SceneScrollControl({
    scene: 'body',
    tracking: 'body'
})

*/

class SceneScrollControl {
    constructor(config) {

        this.scene      = $(config.scene)
        this.tracking   = $(config.tracking)
        this.saveState  = null
        this.flag       = false

        this.callHandler()
    }

    callHandler() {

        this.tracking.on('sceneScrollOff', () => {
            this.scrollSceneOff()
        })

        this.tracking.on('sceneScrollOn', () => {
            this.scrollSceneOn()
        })
    }

    scrollSceneOff() {

        if (!this.flag) {

            this.flag = !this.flag
            this.saveState = this.scene.css('overflow-y')
            this.scene.css('overflow-y', 'hidden')
        }
    }

    scrollSceneOn() {

        if (this.flag) {

            this.flag = !this.flag
            this.scene.css('overflow-y', this.saveState)
            this.saveState = null
        }
    }
}