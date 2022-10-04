'use strict'

class paperRipple {
	constructor(button) {
		this.button = button
		this.wavesContainer = this.rippleSetup()
		this.#paperRipple()
	}

	rippleSetup() {
		const paperRipple = document.createElement('paper-ripple')
		paperRipple.classList.add('yt-paper-ripple')
		this.button.appendChild(paperRipple)
		const wavesContainer = document.createElement('div')
		wavesContainer.classList.add('waves-container')
		paperRipple.appendChild(wavesContainer)
		return wavesContainer
	}
	createRippleDivs() {
		let el = document.createElement('div')
		el.classList.add('waves')
		this.wavesContainer.appendChild(el)
		return el
	}

	#paperRipple() {
		const buttonStyle = window.getComputedStyle(this.button)
		const opacityDelay = Number.parseFloat(
			buttonStyle.getPropertyValue('--lng-ripple-opacity-transduration-woms')
		)
		const delayOpacityClass = Number.parseFloat(
			buttonStyle.getPropertyValue('--lng-ripple-delay-opacity-class')
		)
		const longRippleDelay = Number.parseFloat(
			buttonStyle.getPropertyValue('--lng-ripple-pointerdown-delay-woms')
		)
		const removeElementAfterOpacityDelay = opacityDelay + 1

		this.button.addEventListener('pointerdown', e => {
			const { x, y, width, height } = this.button.getBoundingClientRect()

			const xCoordinatePX = e.clientX - x
			const yCoordinatePX = e.clientY - y

			const xCoordinatePercentage = `${((xCoordinatePX / width) * 100).toFixed(
				2
			)}%`
			const yCoordinatePercentage = `${((yCoordinatePX / height) * 100).toFixed(
				2
			)}%`
			const { buttons } = e
			if (buttons == 1) {
				this.button.setPointerCapture(e.pointerId)
				const longRipple = setTimeout(() => {
					this.button.removeEventListener('pointerup', handlePointerUp)

					const rippleElement = this.createRippleDivs()

					rippleElement.style.setProperty('--x', xCoordinatePercentage)
					rippleElement.style.setProperty('--y', yCoordinatePercentage)
					rippleElement.classList.add('animate-long')
					this.button.addEventListener(
						'pointerup',
						e => {
							setTimeout(() => {
								rippleElement.classList.add('animate-opacity')
								setTimeout(() => {
									rippleElement.remove()
								}, removeElementAfterOpacityDelay)
							}, delayOpacityClass)
						},
						{ once: true }
					)
					this.button.addEventListener(
						'drag',
						e => {
							console.log(`dragging`)
							this.button.addEventListener(
								'dragend',
								e => {
									setTimeout(() => {
										rippleElement.classList.add('animate-opacity')
										setTimeout(() => {
											rippleElement.remove()
										}, removeElementAfterOpacityDelay)
									}, delayOpacityClass)
								},
								{ once: true }
							)
						},
						{ once: true }
					)
					this.button.addEventListener(
						'blur',
						e => {
							setTimeout(() => {
								rippleElement.classList.add('animate-opacity')
								setTimeout(() => {
									rippleElement.remove()
								}, removeElementAfterOpacityDelay)
							}, delayOpacityClass)
						},
						{ once: true }
					)
				}, longRippleDelay)

				const handlePointerUp = e => {
					clearTimeout(longRipple)
					const rippleElement = this.createRippleDivs(this)
					rippleElement.style.setProperty('--x', xCoordinatePercentage)
					rippleElement.style.setProperty('--y', yCoordinatePercentage)
					rippleElement.classList.add('animate-short')
					rippleElement.addEventListener(
						'animationend',
						e => {
							rippleElement.remove()
						},
						{ once: true }
					)
				}
				this.button.addEventListener('pointerup', handlePointerUp, {
					once: true,
				})
			}
			// else if (buttons == 2) {
			// 	this.button.addEventListener(
			// 		'pointerup',
			// 		(e) => {
			// 			const rippleElement = this.createRippleDivs(this);
			// 			rippleElement.style.setProperty('--x', xCoordinatePercentage);
			// 			rippleElement.style.setProperty('--y', yCoordinatePercentage);
			// 			rippleElement.classList.add('animate-like-blur');
			// 			rippleElement.addEventListener(
			// 				'animationend',
			// 				(e) => {
			// 					rippleElement.remove();
			// 				},
			// 				{ once: true }
			// 			);
			// 		},
			// 		{ once: true }
			// 	);
			// }
		})

		this.button.addEventListener('keydown', e => {
			if (e.repeat) return
			switch (e.key) {
				case ' ':
				case 'Enter':
					const xCoordinatePercentage = `${50}%`
					const yCoordinatePercentage = `${50}%`
					const longRipple = setTimeout(() => {
						this.button.removeEventListener('keyup', handlePointerUp)

						const rippleElement = this.createRippleDivs()

						rippleElement.style.setProperty('--x', xCoordinatePercentage)
						rippleElement.style.setProperty('--y', yCoordinatePercentage)
						rippleElement.classList.add('animate-long')
						this.button.addEventListener(
							'keyup',
							e => {
								if (e.key == ' ' || e.key == 'Enter') {
									setTimeout(() => {
										rippleElement.classList.add('animate-opacity')
										setTimeout(() => {
											rippleElement.remove()
										}, removeElementAfterOpacityDelay)
									}, delayOpacityClass)
								}
							},
							{ once: true }
						)
						this.button.addEventListener(
							'blur',
							e => {
								setTimeout(() => {
									rippleElement.classList.add('animate-opacity')
									setTimeout(() => {
										rippleElement.remove()
									}, removeElementAfterOpacityDelay)
								}, delayOpacityClass)
							},
							{ once: true }
						)
					}, longRippleDelay)

					const handlePointerUp = e => {
						clearTimeout(longRipple)
						const rippleElement = this.createRippleDivs(this)
						rippleElement.style.setProperty('--x', xCoordinatePercentage)
						rippleElement.style.setProperty('--y', yCoordinatePercentage)
						rippleElement.classList.add('animate-short')
						rippleElement.addEventListener(
							'animationend',
							e => {
								rippleElement.remove()
							},
							{ once: true }
						)
					}
					this.button.addEventListener('keyup', handlePointerUp, {
						once: true,
					})

					break

				default:
					break
			}
		})
	}
}

export default function rippleButtons(btns) {
	btns.forEach(btn => {
		new paperRipple(btn)
	})
}
