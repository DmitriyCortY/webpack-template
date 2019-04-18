/*
    ---------------------------------------------------------------
    Startup template creator - "Made with love, especially for you"
    ---------------------------------------------------------------
    nickname: Michael Holiday
    organization: "Totonis.com"
    date: 18.06.2018
    email: mr.michael.holiday@gmail.com
    ---------------------------------------------------------------
    parting words: "Well-bred people do not talk in the community about the weather or about religion."
    ---------------------------------------------------------------
*/

class ModalWindow {
    constructor(config) {

        // accept config options
        this.title              = config.title
        this.contentElem        = $(config.contentElem)
        this.triggerOpen        = $(config.triggerOpen)
        
        // modal window conponents
        this.modal              = null
        this.triggerClose       = null
        this.modalContainer     = null
        this.modalTitle         = null

        // additional variables
        this.flag   = false
        
        // save class context 
        let that  = this

        // initialize modal window creation
        this.createModal(that)
        this.buildModal(that)

        // append modal in body
        $('body').append(this.modal)
        
        // toggling the visibility of the modal window
        this.handlerOpen(that)
        this.handlerClose(that)
    }

    // creating modal window components
    createModal(that) {

        // create modal
        that.modal = document.createElement('div')
        that.modal = $(that.modal)
        that.modal.addClass('b-modal-window')

        // create modal close btn
        that.triggerClose = document.createElement('div')
        that.triggerClose = $(that.triggerClose)
        that.triggerClose.addClass('b-modal-window__close')
        
        // create modal container
        that.modalContainer = document.createElement('div')
        that.modalContainer = $(that.modalContainer)
        that.modalContainer.addClass('b-modal-window__container')
        
        // create modal title
        that.modalTitle = document.createElement('div')
        that.modalTitle = $(that.modalTitle)
        that.modalTitle.addClass('b-modal-window__title')
        that.modalTitle.text(that.title)
        
        // create modal content wrapper
        that.modalContent = document.createElement('div')
        that.modalContent = $(that.modalContent)
        that.modalContent.addClass('b-modal-window__content')
    }
    
    // build a modal window of components
    buildModal(that) {

        // build modal
        that.modal.append(that.triggerClose, that.modalContainer)
        that.modalContainer.append(that.modalTitle, that.modalContent)
        that.modalContent.append(that.contentElem)
    }

    // handler open modal
    handlerOpen(that) {

        // check event click open btn
        that.triggerOpen.click(function() {           
            that.modalOpen(that)
        })
    }
    
    // handler close modal
    handlerClose(that) {
        
        // check event click close btn
        that.triggerClose.click(function() {
            that.modalClose(that)
        })

        // check event click close btn
        $(document).keydown(function(e) {
            console.log(123);
            
            // ESCAPE key pressed
            if (e.keyCode == 27) {
                that.modalClose(that)
            }
        })
    }
    
    // interface close modal
    modalClose(that) {
        
        // chekc state flag
        if (that.flag) {
            
            // inverse state flag
            that.flag = !that.flag
            
            // close modal
            that.modal.removeClass('b-modal-window_collapse')
            
            // unlock scroll body
            that.scrollControll('body', 'on')
        }
    }
    
    // interface open modal
    modalOpen(that) {
        
        // chekc state flag
        if (!that.flag) {
            
            // inverse state flag
            that.flag = !that.flag
            
            // open modal
            that.modal.addClass('b-modal-window_collapse')
            
            // lock scroll body
            that.scrollControll('body', 'off')
        }
    }

    // interface scroll controll
    scrollControll(place, command) {

        // check the received command
        if (command == 'on') {
            $(place).trigger('sceneScrollOn')

        } else if (command == 'off') {
            $(place).trigger('sceneScrollOff')
        }
    }
}