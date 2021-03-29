const $stories_screen = document.getElementById('stories_screen')
const $words_screen = document.getElementById('words_screen')
const $final_screen = document.getElementById('final_screen')

function mainScreen (){
	stories_screen.classList.remove("hide")
	
	const titles = []
	for(const story_index in stories){
		titles.push(`<p><button class='btn secondary story' data-story_index='${story_index}'>${stories[story_index].title}</button></p>`)
	}
	$stories_screen.innerHTML = titles.join('')
}

$stories_screen.addEventListener('click',function(e){
	if(e.target.classList.contains('story')){
		wordScreen(e.target.dataset.story_index)
		$stories_screen.classList.add("hide")

	}
})


function wordScreen (index){
	$words_screen.classList.remove("hide")
	$words_screen.dataset.index = index

	const words = []
	const story = stories[index]

	for(const word_index in story.words){
		words.push(`<p><input placeholder='${story.words[word_index]}'></input></p>`)
	}

	words.push(`<button class=submit>Submit</button>`)
	$words_screen.innerHTML = words.join('')
}

$words_screen.addEventListener('submit', function (e) {
	e.preventDefault()

	const elements = $words_screen.elements
	const written_words = {}
	for (const element of elements) {
		written_words[element.placeholder] = element.value
	}
	storyScreen(written_words, $words_screen.dataset.index)
	$words_screen.classList.add("hide")
})

function storyScreen (written_words, index){
	$final_screen.classList.remove("hide")
	let sentence = stories[index].output(written_words)
	sentence += `<button class='btn'>Create another story</button>`
	$final_screen.innerHTML = sentence
}


$final_screen.addEventListener('click', function (e) {
	if(e.target.classList.contains('btn')){
		mainScreen()
		$final_screen.classList.add("hide")
	}
})


mainScreen()
