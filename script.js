const spaceId = "seiy7rn8699i"
const environmentId = "master"
const accessToken = "jQjALrcyHGzzRGmsFJ-0eYbH5K8CtbnUbxcoRX6YY6c"

const mainContent = document.querySelector("main")

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`

const grabDataFromContentful = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {

      const assets = data.includes.Asset
      const projectImages = data.items[0].fields.projectImages
      const projectTitle = data.items[0].fields.projectTitle
      const projectLocation = data.items[0].fields.location

      return projectImages.map(image => {

        const imageId = image.sys.id

        // Return the object in the assets array if projectImageImage ID = asset ID
        const imageData = assets.find(asset => {
          asset.fields.project = projectTitle
          asset.fields.location = projectLocation
          return asset.sys.id == imageId
        })

        return imageData.fields
      })
    })
}

console.log(grabDataFromContentful())

grabDataFromContentful().then(data => {
  data.forEach(photo => {
    mainContent.innerHTML = mainContent.innerHTML + `
      <section class="frame">
        <div class="image ${photo.title.replace(/ +/g, '-').toLowerCase()}">
          <img src="${photo.file.url}" alt="${photo.description}" id="${photo.title.replace(/ +/g, '-').toLowerCase()}">
        </div>
      </section>
    `
  })
});
