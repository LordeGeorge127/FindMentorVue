export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      hourlyRate: data.rate,
      description: data.desc,
      areas: data.areas
    };
    const token = context.rootGetters.token;
    // console.log('token:' + token);
    const response = await fetch(`https://vue-http-demo-lorde-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      });
    const responseData = await response.json();
    if (!response.ok){
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to Register coach');
      throw error;
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      `https://vue-http-demo-lorde-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
    const responseData = await response.json();
    if (!response.ok){
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to Load caches');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);

  }
};