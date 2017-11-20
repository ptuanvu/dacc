const searchPlace = function (context, query) {
  if (!global.service) {
    global.service = new google.maps.places.PlacesService(global.map.$mapObject)
  }
  const request = { query }
  global.service.textSearch(
    request,
    (response) => {
      console.log('GMAP_SEARCH___', response)
      if (!response || response.length === 0) {
        console.error('Search failed')
        return
      }
      const place = response[0].geometry
      if (!place) {
        console.error('Place not found')
        return
      }
      context.$store.commit('SET_MARKER_POSITION', place.location)
    },
    (err) => console.error(err)
  )
}

export { searchPlace }
