// window.addEventListener('DOMContentLoaded', () => {
//     console.log(document.querySelector('#showImage'))
// 	document.querySelector('#showImage').click = () => {
// 		console.log(112233)
// 	}
// })'

console.log(gifshot)
console.log(global.gifshot)
document.querySelector('#showImage').addEventListener("click",()=>{
    creategif()
})
function creategif() {

	const files = openfile.files
	console.log(files);
	const arr = []
	for (let key in files) {
		// console.log("key",files[key]);
		var reader = new FileReader()
		reader.onload = function (e) {
			arr.push(e.target.result)
			if (key == files.length - 1) {
				demo(arr)
			}
		}
		typeof files[key] === 'object' && reader.readAsDataURL(files[key])
	}
}

function demo(images) {
	gifshot.createGIF(
		{
			images: images,
			gifWidth: 200,
			gifHeight: 200,
			interval: 0.5, // seconds
			progressCallback: function (captureProgress) {
				console.log('progress: ', captureProgress)
			},
			completeCallback: function () {
				console.log('completed!!!')
			},
			numWorkers: 2,
		},
		function (obj) {
			console.log(obj)
			demoImg.src = obj.image
		}
	)
}

