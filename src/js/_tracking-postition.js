/*   

new ItemTracking({
    trigger: '[data-tracking-postition-trigger]',
    offset: $(window).height() * 0.2,
    eventName: 'testEvent',
    callBack: function () {
        console.log('callBack')
    }
})

*/

class ItemTracking{
    constructor(config) {

        this.trigger = $(config.trigger)
        this.callBack = config.callBack
        this.offset = parseInt(config.offset, 10) || 0
        this.place =  $(document)
		this.eventName = config.eventName || 'tracking-position-event'
        this.eventPlace = $('body')

        this.window = $(window)
        this.flagEvent = false

        this.handlerScroll()
    }

    visibilityAction() {

        this.callBack()
        this.customEvent()
    }

    customEvent() {

        if (this.eventName && !this.flagEvent) {

            this.flagEvent = !this.flagEvent
            this.eventPlace.trigger(this.eventName)
        }
    }

    handlerScroll() {
        
        this.place.on('scroll', () => {
            
            if (this.calcPosition() <= 0) {

                this.visibilityAction() 
            }
            
        })
    }

    calcPosition() {

        let calc = this.trigger.eq(0).offset().top - this.place.scrollTop() - this.window.height() + this.offset
        return Math.round(calc)
    }
}
