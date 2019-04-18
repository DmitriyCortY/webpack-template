/*

new ScrollToBlock({
    trigger: '[data-scroll-to-block-trigger]',
    anchor: '[data-scroll-to-block-anchor]',
    offset: $(window).height() / 2
})

*/
class ScrollToBlock{
	constructor(config){

		this.trigger 	= $(config.trigger)
		this.anchor 	= $(config.anchor)
		this.offset 	= config.offset || 0
		this.speed 		= config.speed || 600
		this.place 		= $('html')

		this.callHandler()
	}

	callHandler() {

		this.trigger.on('click', () => {

			event.preventDefault()
			this.scroll()
		})
	}

	scroll() {

		this.place.animate({

			scrollTop: this.calcPosition(this)
		}, this.speed)
	}

	calcPosition() {

		let anchorOffsetTop = this.anchor.eq(0).offset().top
		let calc			= anchorOffsetTop - this.offset		
		return calc
	}
}