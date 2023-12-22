<template>
  <section>
    <coach-filter @change-filter='setFilters'></coach-filter>
  </section>
  <base-card>
    <section>
      <div class='controls'>
        <base-button mode='outline'>Refresh</base-button>
        <base-button v-if='!isCoach' link to='/register'>Register as Coach</base-button>
      </div>


      <ul v-if='hasCoaches'>
        <coach-item v-for='coach in filteredCoaches' :key='coach.id' :id='coach.id' :first-name='coach.firstName'
                    :last-name='coach.lastName' :rate='coach.hourlyRate' :areas='coach.areas'></coach-item>
      </ul>
      <h3 v-else>
        No coaches Available
      </h3>

    </section>
  </base-card>
</template>
<script>
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isCoach()
    {
      // console.log(this.$store.getters['coaches/isCoach']);
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
          if (coach.areas.includes('frontend') && this.activeFilter.frontend) {
            return true;
          }
          if (coach.areas.includes('backend') && this.activeFilter.backend) {
            return true;
          }
          if (coach.areas.includes('career') && this.activeFilter.career) {
            return true;
          }
          return false;
        }
      );
    },
    hasCoaches(state) {
      return state.$store.getters['coaches/hasCoaches'];
    }

  },
  methods: {
    setFilters(updateFilters) {
      this.activeFilter = updateFilters;
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>