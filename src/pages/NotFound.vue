<template>
   <section>
     <base-card>
       <h2>Page could not be found</h2>
       <p>page could not be found!Check out <router-link to='/coaches'>Coaches</router-link></p>
     </base-card>
   </section>
</template>
<script>
import BaseCard from '@/components/ui/BaseCard.vue';

export default {
  components:{
    BaseCard

  }
}
</script>