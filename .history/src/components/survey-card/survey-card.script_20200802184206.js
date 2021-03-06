import { mapActions, mapGetters } from 'vuex'


const IMAGE_BASE = '/img';

export default {
    data () {
        return {
            id: this.cardInfo.id,
            name: this.cardInfo.name,
            argument: this.cardInfo.argument,
            category: this.cardInfo.category,
            publishDate: this.cardInfo.publishDate,
            image: this.cardInfo.image,
            publicPath: process.env.BASE_URL,
            marginTop: '295px',
            userVote: '',
            voteStatus: false,
            cardData: this.getCardVotes(),
            voteData: {}
        }
    },
    props: {
        cardInfo: {}
    },
    computed: {
        styles() {
            return {
                'background-image': `url(${this.publicPath}${this.image})`,
                'background-size': 'cover'
            }
        }
    },
    mounted() {
        // const cards = this.getCardVotes()
        // console.log(cards)
        this.getCardData()
        this.setMarginTop()
        
    },
    methods: {
        ...mapGetters({
            getCardVotes: 'getCardsStatus'
        }),

        ...mapActions({
            setCardVotes: 'saveCardVotesAction'
        }),

        setMarginTop() {
            const height = this.$refs.cardTitle.clientHeight
            this.marginTop = (335 - height) + "px"
        },

        selectVote(vote) {
            this.userVote = vote
        },

        voteNow() {
            if(this.voteStatus) {
                this.voteStatus = !this.voteStatus
                this.argument = this.cardInfo.argument,
            } else {
                if(this.userVote === 'up') {

                    this.setCardVotes({
                        id: this.id,
                        thumbUp: !this.voteData.thumbsUp ? 1 : this.voteData.thumbsUp + 1,
                        thumbDown: this.voteData.thumbsDown,
                        votesNumber: !this.voteData.votesNumber ? 1 : this.voteData.votesNumber + 1
                    })

                    this.voteStatus = !this.voteStatus
                    this.userVote = ''
                    this.argument = 'Thank you for voting!'

                    this.getCardData()

                } else if (this.userVote === 'down') {
                    this.setCardVotes({
                        id: this.id,
                        thumbUp: this.voteData.thumbsUp,
                        thumbDown: !this.voteData.thumbsDown ? 1 : this.voteData.thumbsDown + 1,
                        votesNumber: !this.voteData.votesNumber ? 1 : this.voteData.votesNumber + 1
                    })

                    this.voteStatus = !this.voteStatus
                    this.userVote = ''
                    this.argument = 'Thank you for voting!'

                    this.getCardData()

                } else {
                    return
                }
            }
        },

        getCardData() {
            if(this.cardData[this.id]){
                this.voteData = {
                    thumbsUp: this.cardData[this.id].thumbUp,
                    thumbsDown: this.cardData[this.id].thumbDown,
                    votesNumber: this.cardData[this.id].votesNumber
                }    
            } else {
                return
            }
        },

        calcPorcent(thumb) {
            this.voteData.votesNumber = !this.voteData.votesNumber ? 0 : this.voteData.votesNumber;
            this.voteData.thumbsUp = !this.voteData.thumbsUp ? 0 : this.voteData.thumbsUp;
            this.voteData.thumbsDown = !this.voteData.thumbsDown ? 0 : this.voteData.thumbsDown;

            if (thumb === 'up') {
                return !Math.round((this.voteData.thumbsUp / this.voteData.votesNumber) * 100) ? 
                    '0%' : Math.round((this.voteData.thumbsUp / this.voteData.votesNumber) * 100) + '%'
            } else if (thumb === 'down') {
                return !Math.round((this.voteData.thumbsDown / this.voteData.votesNumber) * 100) ? 
                    '0%' : Math.round((this.voteData.thumbsDown / this.voteData.votesNumber) * 100) + '%'
            }
        }
    }
}