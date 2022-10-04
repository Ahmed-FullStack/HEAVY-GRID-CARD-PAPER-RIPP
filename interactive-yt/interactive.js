const interactiveYoutube = document.querySelectorAll('.interactive-yt')

interactiveYoutube.forEach(interactive => {
	let interactiveContainer = document.createElement('div')
	interactiveContainer.classList.add('interactive-container')
	interactive.appendChild(interactiveContainer)
	let fill = createDivs('div', interactiveContainer)
	fill.classList.add('interactive-fill')
	let stroke = createDivs('div', interactiveContainer)
	stroke.classList.add('interactive-stroke')
	interactive.addEventListener('pointerdown', e => {
		if (e.buttons === 1) {
			fill.classList.remove('animate')
			stroke.classList.remove('animate')
			e.target.setPointerCapture(e.pointerId)
			let t = setTimeout(() => {
				interactive.removeEventListener('pointerup', handleClick)

				fill.classList.add('animate-long')

				interactive.addEventListener(
					'pointerup',
					e => {
						fill.classList.remove('animate-long')
						stroke.classList.add('animate')
						stroke.addEventListener(
							'animationend',
							e => {
								stroke.classList.remove('animate')
							},
							{ once: true }
						)
					},
					{ once: true }
				)
			}, 120)

			interactive.addEventListener('pointerup', handleClick, { once: true })
			function handleClick(e) {
				clearTimeout(t)
				fill.classList.add('animate')
				fill.addEventListener(
					'animationend',
					e => {
						fill.classList.remove('animate')
						stroke.classList.add('animate')
						stroke.addEventListener(
							'animationend',
							e => {
								stroke.classList.remove('animate')
							},
							{ once: true }
						)
					},
					{ once: true }
				)
			}
		}
	})
	interactive.addEventListener('keydown', e => {
		if (e.repeat) return
		switch (e.key) {
			case ' ':
			case 'Enter':
				fill.classList.remove('animate')
				stroke.classList.remove('animate')
				let t = setTimeout(() => {
					interactive.removeEventListener('pointerup', handleClick)

					fill.classList.add('animate-long')

					interactive.addEventListener(
						'keyup',
						e => {
							fill.classList.remove('animate-long')
							stroke.classList.add('animate')
							stroke.addEventListener(
								'animationend',
								e => {
									stroke.classList.remove('animate')
								},
								{ once: true }
							)
						},
						{ once: true }
					)
				}, 120)

				interactive.addEventListener('keyup', handleClick, { once: true })
				function handleClick(e) {
					clearTimeout(t)
					fill.classList.add('animate')
					fill.addEventListener(
						'animationend',
						e => {
							fill.classList.remove('animate')
							stroke.classList.add('animate')
							stroke.addEventListener(
								'animationend',
								e => {
									stroke.classList.remove('animate')
								},
								{ once: true }
							)
						},
						{ once: true }
					)
				}
				break

			default:
				break
		}
	})
})

function createDivs(element, appendTo) {
	let el = document.createElement(element)
	appendTo.appendChild(el)
	return el
}
