<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{$routes}}</span>
           <q-icon
            class="q-pa-md lt-md header-icon"
            name="fab fa-cuttlefish"
            size="md"
            color="primary"
          />
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" :width="283" bordered>
      <q-icon
        class="q-pa-md"
        name="fab fa-cuttlefish"
        size="lg"
        color="primary"
      />
      
      <q-list>
      <q-item
        clickable
        v-ripple
        to="/"
        exact
      >
        <q-item-section avatar>
          <q-icon name="home" size="md"/>
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        to="/about"
        exact
      >
        <q-item-section avatar>
          <q-icon name="help" size="md"/>
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
      </q-item>
      
    </q-list>

    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>

      <q-input outlined rounded v-model="text" class="q-ma-md" placeholder="Search" dense>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list padding separator>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-gray">Education</q-item-label>
          <q-item-label class="text-weight-bold">Someting weird happend!</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-gray">Education</q-item-label>
          <q-item-label class="text-weight-bold">Someting weird happend!</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-gray">Education</q-item-label>
          <q-item-label class="text-weight-bold">Someting weird happend!</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      </q-list>

    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>

<style lang="sass">
  .header-icon
    position: absolute
    bottom: 0
    left: 50%
    transform: translateX(-50%)
</style>