let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')

let timeIssLocationFetched = document.querySelector('#time')

let update = 10000                                          // Set interval for updating
let maxFailedAttempts = 3                                    // Attempt count for failed connection

let issMarker
let issIcon = L.icon({
    iconUrl: 'issIcon.png',
    iconSize: [50, 50],                                     // Array- height and width
    iconAnchor: [25,25]                                     // size of half the icon

})

let map = L.map('iss-map').setView([0, 0], 1.75)               // Centered on long-0, lat-0, whole world= 1
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


iss(maxFailedAttempts)                       //  Initial call function one time to start
// setInterval(iss, update) // 10 second intervals

function iss(attempts) {
    if (attempts <= 0) {
        alert('Failed to contact ISS server after several attempts.')            // Alert to user
        return
    }
// Long hand
    fetch(url).then( (res) => {                                     
        return res.json()               // Process response into JSON
    }).then( (issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
        // create marker if it doesn't exist
        // move marker if it does exist
// Short hand
    // fetch(url).then( res => res.json() )
    // .then( (issData) => {
    //     console.log(issData)
    // }).catch( (err) => {
    //     console.log('ERROR!', err)
    // })

        if (!issMarker) {
            // create marker
            issMarker = L.marker([lat, long], {icon: issIcon} ).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }
// Update the time/date element to the current date and time
        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`          // Backticks

    }).catch( (err) => {
        attempts = attempts - 1                                                    //subtract 1 from number of attempts. Break url on line 1 to test, change time interval to 1000
        console.log('ERROR!', err)
    }).finally( () => {
        // finally runs whether the fetch() worked or failed
        // Call the iss function agter a delay of update milliseconds
        // to update the postion
        setTimeout(iss, update, attempts)                                                     // recursive time out using setTimeOut
    })


}


