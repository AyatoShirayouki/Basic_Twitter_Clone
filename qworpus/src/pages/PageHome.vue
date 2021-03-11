<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input class="new-qweet" bottom-slots v-model="newQweetContent" placeholder="Make a new post?" counter maxlength="300" autogrow>
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>
      </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn @click="addNewQweet" class="q-mb-lg" :disable="!newQweetContent" unelevated rounded color="primary" label="Post" no-caps/>
      </div>
      
    </div>
     <q-separator class="divider" size="10px" color="grey-2"/>

    <q-list separator>
      <transition-group
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
      >
      <q-item
       class="qweet q-py-md"
       v-for="qweet in qweets"
       :key="qweet.id"
      >
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Alex Nestorov</strong>
            <span class="text-grey-7">
              @alex__nestorov 
              <br class="lt-md">&bull; {{qweet.date | relativeDate}}
            </span> 
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            {{qweet.content}}
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
              flat round :color="qweet.liked ? 'pink' : 'grey'"
              size="sm"
              @click="toggleLiked(qweet)"
              />
            <q-btn flat round color="grey" icon="far fa-comment" size="sm"/>
            <q-btn flat round color="grey" icon="fas fa-retweet" size="sm"/>
            <q-btn @click="deleteQweet(qweet)" flat round color="grey" icon="fas fa-trash" size="sm"/>
          </div>
        </q-item-section>
      </q-item>
      </transition-group>
    </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'

import { formatDistance} from 'date-fns'
export default {
  name: 'PageHome',
  data(){
    return{
      newQweetContent: '',
      qweets: [
        //{
          //id: 'ID1',
          //content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'+
                    //'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'+
                    //'when an unknown printer took a galley of type and scrambled it to make a type specimen book'+
                    //'It has survived not only five centuries, but also the leap into electronic typesetting',
                    
          //date: 1611653238221,
          //liked: false
        //},
        //{
          //id: 'ID2',
          //content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'+
                    //'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'+
                    //'when an unknown printer took a galley of type and scrambled it to make a type specimen book'+
                    //'It has survived not only five centuries, but also the leap into electronic typesetting'+
                    //'remaining essentially unchanged. It was popularised in the 1960s with the release of'+
                    //'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing'+
                    //'software like Aldus PageMaker including versions of Lorem Ipsum.',
          //date: 1611653252444,
          //liked: true
        //},
      ]
    }
  },
  methods:{
    addNewQweet(){
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false
      }
      //this.qweets.unshift(newQweet)

      db.collection('qweets').add(newQweet).then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
    }).catch((error) => {
      console.error('Error adding document: ', error)
    })

      this.newQweetContent = ''
    },
    deleteQweet(qweet){
      db.collection('qweets').doc(qweet.id).delete().then(() => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    toggleLiked(qweet){
      db.collection("qweets").doc(qweet.id).update({
        liked: !qweet.liked
      })
      .then(() => {
        console.log("Document successfully updated!")
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error)
      })
    }
  },
  filters:{
    relativeDate(value){
      return formatDistance(value, new Date())
    }
  },
  mounted(){
    db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            let qweetChange = change.doc.data()
            qweetChange.id = change.doc.id
            if (change.type === 'added') {
                console.log('New post: ', qweetChange)
                this.qweets.unshift(qweetChange)
            }
            if (change.type === 'modified') {
                console.log('Modified post: ', qweetChange)
                let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
                Object.assign(this.qweets[index], qweetChange)
            }
            if (change.type === 'removed') {
                console.log('Removed post: ', qweetChange)
                let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
                this.qweets.splice(index, 1)
            }
        })
    })
  }
}
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>
