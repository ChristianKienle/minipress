<template>
  <div>odata example</div>
</template>

<script>
export default {
  async mounted() {
    const odata = this.$odata
    console.log('odataodataodataodataodataodataodataodata', odata)
      const request = await odata.o('https://services.odata.org/V3/OData/OData.svc/').get('Products').query({$format: 'json'})

  console.log(request)
  }
}
</script>

<style>

</style>