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
            vote: '',
            voteStatus: false
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
        const cards = this.getCardVotes()
        console.log(cards)
        
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
            this.vote = vote
        },
        voteNow() {
            if(this.voteStatus) {
                this.voteStatus = !this.voteStatus
            } else {
                this.voteStatus = !this.voteStatus


            }
            
        }
    }
}