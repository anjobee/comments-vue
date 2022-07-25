/* HOW TO USE:



*/
export default {
    data: () => ({
            offsetTop: 0,
            offsetRight: "-999em",
            commentableAreaBounds: '',
            popupRectangleBounds: '',
            commentableElements: []
        }),
        mounted () {
            const commentableArea = document.getElementById('commentableArea')
            const popup = document.getElementById('popup')

            if (!commentableArea) {
                console.warn('Comment plugin is currently off: No "commentableArea" ID has been found in any HTML element/s.')
                return
            }

            this.getCommentableElements(commentableArea)

            this.commentableAreaBounds = this.getBounds(commentableArea)
            this.popupRectangleBounds = this.getBounds(popup)

            window.addEventListener("mouseover", this.listenToHover)
        },
        destroyed() {
            window.removeEventListener("mouseover", this.listenToHover)
        },
        methods: {
        listenToHover (e) {
            if (e.target.id === 'popup') return

            if (this.commentableElements.includes(e.target)) {
            setTimeout(() => {
                if (e.target.id !== 'popupChild') {
                    const targetBounds = this.getBounds(e.target)
                    const popupOffset = this.popupRectangleBounds.height * 0.25
                    this.offsetTop = `${targetBounds.top - this.commentableAreaBounds.top - popupOffset}px`
                }
                    this.offsetRight = `5%`
                }, 0)
            }
            else {
                this.offsetRight = '-999em'
            }
        },
        getBounds (node) {
            const range = new Range()
            range.selectNode(node)
            return range.getBoundingClientRect()
        },
        getCommentableElements (commentableArea) {
            for (const child of commentableArea.childNodes) {
                if (child.id === 'popup') {
                    for (const popupChildren of child.childNodes) {
                        this.commentableElements.push(popupChildren)
                    }
                }
                this.commentableElements.push(child)
            }
        },
        postComment () {
            console.log('hello')
        }
    }
}